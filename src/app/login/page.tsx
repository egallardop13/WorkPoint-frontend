'use client'
import LoginPageImage from '@/components/login/LoginPageImage'
import { Button } from '@/components/ui/button'
import { Field, Label } from '@/components/ui/fieldset'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/lib/validation'
import { z } from 'zod'

type LoginFormData = z.infer<typeof loginSchema>
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../api/auth/actions'
import workPointLogo from '/public/teams/rocketLaunch.svg'

export default function Login() {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data)
      setIsRedirecting(true)
      router.push('/dashboard')
    } catch (error) {
      setError('root', { type: 'server', message: (error as Error).message })
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 bg-white dark:bg-zinc-900">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image alt="WorkPoint Logo" src={workPointLogo} className="h-10 w-auto" />
              <Heading level={2} className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
              </Heading>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Field>
                    <Label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Email address
                    </Label>
                    <div className="mt-2">
                      <Input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        className=""
                        {...register('email', { onChange: () => clearErrors('root') })}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </Field>

                  <Field>
                    <Label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </Label>
                    <div className="mt-2">
                      <Input
                        id="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className=""
                        {...register('password', { onChange: () => clearErrors('root') })}
                      />
                      {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                  </Field>
                  <div>
                    <Button
                      type="submit"
                      className={clsx(
                        'flex w-full justify-center rounded-md',
                        (isSubmitting || isRedirecting) && 'cursor-wait opacity-50'
                      )}
                      disabled={isSubmitting || isRedirecting}
                    >
                      {isRedirecting ? 'Redirecting\u2026' : isSubmitting ? 'Signing in\u2026' : 'Sign in'}
                    </Button>
                    {errors.root && <p className="mt-1 text-sm text-red-500">{errors.root.message}</p>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <LoginPageImage />
      </div>
    </>
  )
}
