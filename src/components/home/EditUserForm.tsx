'use client'
import { DepartmentListBox } from '@/app/dashboard/settings/departmentListBox'
import { useUpsertUser } from '@/lib/mutations'
import { editUserSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CurrencyDollarIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { ErrorMessage, Field } from '@/components/ui/fieldset'
import { Heading, Subheading } from '@/components/ui/heading'
import { Input, InputGroup } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import type { User, DepartmentInfo, EditUserInput } from '@/types'

interface EditUserFormProps {
  user: User
  departments: DepartmentInfo[]
}

function EditUserForm({ user, departments }: EditUserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
    clearErrors,
  } = useForm<EditUserInput>({ resolver: zodResolver(editUserSchema) })
  const router = useRouter()
  const upsertMutation = useUpsertUser()

  async function onSubmit(data: EditUserInput) {
    const isActive = data.active === 'true'
    let dateExited = user.dateExited

    if (isActive !== user.active) {
      if (isActive) {
        dateExited = '1900-01-01T22:56:38.542Z'
      } else {
        dateExited = new Date().toISOString()
      }
    }
    const upsert = {
      ...user,
      ...data,
      active: isActive,
      dateExited,
    }
    try {
      const result = await upsertMutation.mutateAsync(upsert)
      reset()

      if (result.status === 200) {
        toast.success('Employee edited successfully')
        router.push(`/dashboard/users/${user.userId}`)
      }
    } catch (error) {
      const err = error as Error
      console.error('Error editing user:', err)
      setError('root', { type: 'server', message: err.message })
      toast.error(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 max-w-4xl lg:mt-8">
      <Heading>Edit {user.firstName}&apos;s profile </Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee First Name</Subheading>
          <Text>Update the legal first name of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee First Name"
              defaultValue={user.firstName}
              placeholder="John"
              {...register('firstName')}
            />
            {errors.firstName && <ErrorMessage>{errors.firstName.message as string}</ErrorMessage>}
          </Field>
        </div>
      </section>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Last Name</Subheading>
          <Text>Update the legal last name of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee Last Name"
              defaultValue={user.lastName}
              placeholder="Smith"
              {...register('lastName')}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName.message as string}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Job Title</Subheading>
          <Text>
            Update the role or position within the organization (e.g., &quot;Software Engineer&quot; or
            &quot;Marketing Manager&quot;).
          </Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Job Title"
              defaultValue={user.jobTitle}
              placeholder="Sales Associate"
              {...register('jobTitle')}
            />
            {errors.jobTitle && <ErrorMessage>{errors.jobTitle.message as string}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Department</Subheading>
          <Text>
            Update the department where the employee will be working (e.g., &quot;Engineering,&quot; &quot;HR,&quot;
            or &quot;Sales&quot;).
          </Text>
        </div>
        <Controller
          control={control}
          name="department"
          defaultValue={user.department}
          render={({ field }) => (
            <DepartmentListBox onChange={field.onChange} value={field.value} departments={departments} />
          )}
        />
      </section>
      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Email</Subheading>
          <Text>Update the official work email address for the employee.</Text>
        </div>
        <div className="space-y-4">
          <Field>
            <Input
              type="email"
              aria-label="Employee Email"
              defaultValue={user.email}
              placeholder="johnsmith@example.com"
              {...register('email')}
            />
            {errors.email && <ErrorMessage>{errors.email.message as string}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Gender</Subheading>
          <Text>Update the official employee gender.</Text>
        </div>
        <div className="space-y-4">
          <Field>
            <Input
              type="gender"
              aria-label="Employee Gender"
              defaultValue={user.gender}
              placeholder="male or female"
              {...register('gender')}
            />
            {errors.gender && <ErrorMessage>{errors.gender.message as string}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Annual Salary</Subheading>
          <Text>Update the employee&apos;s yearly salary in USD</Text>
        </div>
        <InputGroup>
          <CurrencyDollarIcon className="size-5 text-stone-900 dark:text-stone-500" />
          <Field>
            <Input
              aria-label="Employee Salary"
              defaultValue={user.salary}
              placeholder="70000"
              {...register('salary')}
            />
            {errors.salary && <ErrorMessage>{errors.salary.message as string}</ErrorMessage>}
          </Field>
        </InputGroup>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Status</Subheading>
          <Text>Update the current employment status for the employee.</Text>
        </div>
        <div>
          <Select
            aria-label="Employee Status"
            defaultValue={String(user.active)}
            {...register('active')}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Select>
          {errors.active && <ErrorMessage>{errors.active.message as string}</ErrorMessage>}
        </div>
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button href={`/dashboard/users/${user.userId}`} plain>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}

export default EditUserForm
