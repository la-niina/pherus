import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { cn } from '@/environments/ui'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width} className={cn('flex flex-col gap-2')}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required text-red-400">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        placeholder={defaultValue}
        id={name}
        type="text"
        className={cn('rounded-none border-l-yellow-500 border-l-[5px]')}
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
      />

      {errors[name] && <Error />}
    </Width>
  )
}
