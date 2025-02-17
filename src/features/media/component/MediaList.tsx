'use client'

import * as React from 'react'
import { getTranslation } from '@payloadcms/translations'
import {
  Gutter,
  ListHeader,
  ListViewClientProps,
  RenderCustomComponent,
  SelectionProvider,
  TableColumnsProvider,
  useAuth,
  useConfig,
  useListQuery,
  useWindowInfo,
  ViewDescription,
  useTranslation,
  useModal,
  useListDrawerContext,
  useBulkUpload,
  useEditDepth,
  useStepNav,
  ListControls,
  SelectMany,
  PerPage,
  Pagination,
} from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { formatFilesize } from 'payload/shared'
import Image from 'next/image'
import { Edit, Eye, Folder, Lock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatDateTime } from '@/utilities/formatDateTime'

const baseClass = 'collection-list'

/**
 * Whats ever the fuck i just made up here so take it at face value, any why do I care
 */
interface FolderStructure {
  path: string
  items: number
  files: Array<any>
}

/**
 * after a turn of attempts trying to figure out a structure using filter and map and flatmap blablabla
 * i just throw the unrefined code into chatgpt which amounted to 9 hours of bioling angry and hate fuck gpt
 * so deep seek did the trick in 6 atempts with a turn of explanations and reexplanations
 */
const processFileStructure = (docs: any[]): { folders: FolderStructure[]; files: any[] } => {
  const folderMap = new Map<string, FolderStructure>()
  const rootFiles: any[] = []

  docs.forEach((doc) => {
    // If there's no prefix or it's empty/null, it's a root file
    if (!doc.prefix || doc.prefix.trim() === '' || doc.prefix.trim() === '.') {
      rootFiles.push(doc)
      return
    }

    const paths = doc.prefix.split('/')
    let currentPath = ''

    paths.forEach((segment: string) => {
      if (segment.trim() === '' || segment.trim() === '.') return // Skip empty segments

      currentPath = currentPath ? `${currentPath}/${segment}` : segment
      if (!folderMap.has(currentPath)) {
        folderMap.set(currentPath, {
          path: currentPath,
          items: 0,
          files: [],
        })
      }

      const folder = folderMap.get(currentPath)!
      folder.items++
      folder.files.push(doc)
    })
  })

  return {
    folders: Array.from(folderMap.values()),
    files: rootFiles,
  }
}

export const MediaList: React.FC<ListViewClientProps> = (props) => {
  const {
    AfterList,
    AfterListTable,
    beforeActions,
    BeforeList,
    BeforeListTable,
    collectionSlug,
    columnState,
    Description,
    disableBulkDelete,
    disableBulkEdit,
    enableRowSelections,
    hasCreatePermission,
    listPreferences,
    newDocumentURL,
    preferenceKey,
    renderedFilters,
    Table: InitialTable,
  } = props
  const [Table, setTable] = React.useState(InitialTable)

  const { createNewDrawerSlug, drawerSlug: listDrawerSlug, onBulkSelect } = useListDrawerContext()

  React.useEffect(() => {
    if (InitialTable) {
      setTable(InitialTable)
    }
  }, [InitialTable])

  const { user } = useAuth()
  const { getEntityConfig } = useConfig()
  const router = useRouter()
  const [currentPath, setCurrentPath] = React.useState<string>('')
  // since i couldnt understand the render thing in the payload ui code i just decide to use
  // usestate and ref from now the routing displayed in the browser, it solved the issue

  const {
    data,
    defaultLimit: initialLimit,
    handlePageChange,
    handlePerPageChange,
    query,
  } = useListQuery()

  const { openModal } = useModal()
  const { setCollectionSlug, setCurrentActivePath, setOnSuccess } = useBulkUpload()
  const { drawerSlug: bulkUploadDrawerSlug } = useBulkUpload()

  const collectionConfig = getEntityConfig({ collectionSlug })
  const { labels, upload } = collectionConfig
  const isUploadCollection = Boolean(upload)
  const isBulkUploadEnabled = isUploadCollection && collectionConfig.upload.bulkUpload
  const isInDrawer = Boolean(listDrawerSlug)
  const { i18n, t } = useTranslation()
  const drawerDepth = useEditDepth()
  const { setStepNav } = useStepNav()
  const {
    breakpoints: { s: smallBreak },
  } = useWindowInfo()

  // Navigate to edit like we're time travelers with a very specific destination
  // now for this part, hear me out I planned to get the collections exact name but
  // Its 4:41 am in the fucking morning so if I forgot to do this use your brain for a change
  const handleNavigateToEdit = (id: string) => {
    router.push(`/admin/collections/${collectionSlug}/${id}`)
  }

  const docs = React.useMemo(() => {
    if (isUploadCollection) {
      return data.docs.map((doc) => {
        return {
          ...doc,
          filesize: formatFilesize(doc.filesize),
        }
      })
    } else {
      return data.docs
    }
  }, [data.docs, isUploadCollection])

  // Process our files like a bureaucrat on coffee or my favourate a beer and a cup of bread
  const { folders, files } = React.useMemo(() => processFileStructure(data.docs), [data.docs])

  // Filter files like we're sorting socks, but with actual success
  const currentFiles = React.useMemo(() => {
    if (!currentPath) {
      // If we're at root, show files with no prefix or empty prefix
      return docs.filter(
        (doc) => !doc.prefix || doc.prefix.trim() === '' || doc.prefix.trim() === '.',
      )
    }
    // Otherwise show files with matching prefix
    return docs.filter((doc) => doc.prefix === currentPath)
  }, [docs, currentPath])

  // Filter folders based on current path, this one make a lot of since
  const currentFolders = React.useMemo(
    () =>
      folders.filter((folder) => {
        if (!currentPath) return !folder.path.includes('/')
        return (
          folder.path.startsWith(currentPath) &&
          folder.path.split('/').length === currentPath.split('/').length + 1
        )
      }),
    [folders, currentPath],
  )

  const openBulkUpload = React.useCallback(() => {
    setCollectionSlug(collectionSlug)
    setCurrentActivePath(collectionSlug)
    openModal(bulkUploadDrawerSlug)
    setOnSuccess(collectionSlug, () => router.refresh())
  }, [
    router,
    collectionSlug,
    bulkUploadDrawerSlug,
    openModal,
    setCollectionSlug,
    setCurrentActivePath,
    setOnSuccess,
  ])

  React.useEffect(() => {
    if (!drawerDepth) {
      setStepNav([
        {
          label: labels?.plural,
        },
      ])
    }
  }, [setStepNav, labels, drawerDepth])

  return (
    <React.Fragment>
      <TableColumnsProvider
        collectionSlug={collectionSlug}
        columnState={columnState}
        docs={docs}
        enableRowSelections={enableRowSelections}
        listPreferences={listPreferences}
        preferenceKey={preferenceKey!}
        setTable={setTable}
      >
        <div className={`${baseClass} ${baseClass}--${collectionSlug}`}>
          <SelectionProvider docs={docs} totalDocs={data.totalDocs} user={user!}>
            {BeforeList}
            <Gutter className={`${baseClass}__wrap`}>
              <ListHeader
                collectionConfig={collectionConfig}
                Description={
                  <div className={`${baseClass}__sub-header bg-accent/45`}>
                    <RenderCustomComponent
                      CustomComponent={Description}
                      Fallback={
                        <ViewDescription description={collectionConfig?.admin?.description} />
                      }
                    />
                  </div>
                }
                hasCreatePermission={hasCreatePermission}
                i18n={i18n!}
                isBulkUploadEnabled={isBulkUploadEnabled!}
                newDocumentURL={newDocumentURL}
                openBulkUpload={openBulkUpload}
                smallBreak={smallBreak!}
                // @ts-ignore
                t={t}
              />
              <ListControls
                beforeActions={
                  enableRowSelections && typeof onBulkSelect === 'function'
                    ? beforeActions
                      ? [...beforeActions, <SelectMany key="select-many" onClick={onBulkSelect} />]
                      : [<SelectMany key="select-many" onClick={onBulkSelect} />]
                    : beforeActions
                }
                collectionConfig={collectionConfig}
                collectionSlug={collectionSlug}
                disableBulkDelete={disableBulkDelete}
                disableBulkEdit={disableBulkEdit}
                renderedFilters={renderedFilters}
              />
              {currentPath && (
                <div className="flex items-center space-x-2 text-sm">
                  <Button
                    variant={'link'}
                    className="decoration-pink-300 hover:decoration-violet-500 cursor-pointer text-lg decoration-wavy underline bg-transparent border-none"
                    onClick={() => setCurrentPath('')}
                  >
                    Root
                  </Button>
                  {currentPath.split('/').map((segment, index, array) => (
                    <React.Fragment key={segment}>
                      <span className="cursor-none">/</span>
                      <Button
                        variant={'link'}
                        className="decoration-pink-300 hover:decoration-violet-500 cursor-pointer text-lg decoration-wavy underline bg-transparent border-none"
                        onClick={() => setCurrentPath(array.slice(0, index + 1).join('/'))}
                      >
                        {segment}
                      </Button>
                    </React.Fragment>
                  ))}
                </div>
              )}
              {docs.length > 0 && (
                <div className={'flex flex-col gap-3'}>
                  {/* Folders go here for whatever reason the payload gods decide no complains here */}
                  {currentFolders.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {currentFolders.map((folder) => (
                        <Card
                          key={folder.path}
                          className="cursor-pointer hover:bg-accent/50 transition-colors bg-accent/80"
                          onClick={() => setCurrentPath(folder.path)}
                        >
                          <CardContent className="flex items-center p-4 space-x-3 border border-current">
                            <Folder className="h-10 w-10 stroke-none fill-current" />
                            <div>
                              <h3 className="font-medium">{folder.path.split('/').pop()}</h3>
                              <p className="text-sm text-muted-foreground">
                                {folder.items} item{folder.items !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Files  */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {currentFiles.map((doc) => (
                      <Card key={doc.id} className="overflow-hidden group">
                        <CardContent className="p-0 relative">
                          {/* Add error boundary for image loading */}
                          <div className="aspect-square relative overflow-hidden">
                            <Image
                              src={doc.thumbnailURL || doc.url}
                              alt={doc.alt || doc.filename}
                              fill
                              className="object-cover h-full"
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              priority={false}
                              onError={(e) => {
                                // Fallback to a placeholder if image fails to load
                                const imgElement = e.target as HTMLImageElement
                                imgElement.src = '/placeholder-image.jpeg' // Add your placeholder image
                                imgElement.alt = 'Placeholder Image'
                              }}
                            />
                          </div>

                          {/* Hover actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            {/** originally wanted to add a dialog, but I got exhausted */}
                            <Button
                              variant="secondary"
                              size="icon"
                              className="border-none rounded-full size-16"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(doc.url, '_blank')
                              }}
                            >
                              <Eye className="h-6 w-6" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="border-none rounded-full size-16"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleNavigateToEdit(doc.id)
                              }}
                            >
                              <Edit className="h-6 w-6" />
                            </Button>
                          </div>

                          {/* File info */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 text-white">
                            <p className="text-sm font-medium truncate">{doc.filename}</p>
                            <div className="flex flex-row items-center justify-between">
                              <p className="text-xs opacity-70">{doc.filesize}</p>
                              <p className="text-xs text-green-500 opacity-70">
                                {formatDateTime(doc.updatedAt)}
                              </p>
                            </div>
                          </div>

                          {doc._isLocked && (
                            // this lock part i don't understand its point in media cases but here it is
                            <Lock className="absolute top-2 left-2 h-4 w-4 text-white" />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {BeforeListTable}
              {docs.length === 0 && (
                <div
                  className={`${baseClass}__no-results flex flex-col items-center justify-center h-full max-h-screen`}
                >
                  <p>
                    {i18n.t('general:noResults', { label: getTranslation(labels?.plural, i18n) })}
                  </p>
                  {hasCreatePermission && newDocumentURL && (
                    <React.Fragment>
                      {isInDrawer ? (
                        <Button
                          variant={'default'}
                          size={'sm'}
                          onClick={() => openModal(createNewDrawerSlug!)}
                        >
                          {i18n.t('general:createNewLabel', {
                            label: getTranslation(labels?.singular, i18n!),
                          })}
                        </Button>
                      ) : (
                        <Button
                          variant={'link'}
                          size={'sm'}
                          className={
                            'decoration-cyan-300 decoration-wavy hover:animate-pulse hover:decoration-slice underline border-none'
                          }
                          asChild
                        >
                          <Link href={newDocumentURL}>
                            {i18n.t('general:createNewLabel', {
                              label: getTranslation(labels?.singular, i18n),
                            })}
                          </Link>
                        </Button>
                      )}
                    </React.Fragment>
                  )}
                </div>
              )}
              {AfterListTable}
              {docs.length > 0 && (
                <div className={`${baseClass}__page-controls`}>
                  {/* Pagination - Because infinite scroll is so Web 2.0 */}
                  {data.totalPages > 1 && (
                    <div className="flex justify-between w-full items-center mt-4">
                      <Pagination
                        hasNextPage={data.hasNextPage}
                        hasPrevPage={data.hasPrevPage}
                        limit={data.limit}
                        nextPage={data.nextPage!}
                        numberOfNeighbors={1}
                        onChange={handlePageChange}
                        page={data.page}
                        prevPage={data.prevPage!}
                        totalPages={data.totalPages}
                      />
                      <PerPage
                        handleChange={handlePerPageChange}
                        limit={data.limit! || initialLimit!}
                        limits={data.totalPages > 1 ? [10, 25, 50, 100] : [10, 25, 50]}
                      />
                    </div>
                  )}
                </div>
              )}
            </Gutter>
            {AfterList}
          </SelectionProvider>
        </div>
      </TableColumnsProvider>
    </React.Fragment>
  )
}
