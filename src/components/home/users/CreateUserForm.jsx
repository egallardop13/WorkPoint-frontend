'use client'
import { DepartmentListBox } from '@/app/dashboard/settings/departmentListBox'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { ErrorMessage, Field } from '@/components/ui/fieldset'
import { Heading, Subheading } from '@/components/ui/heading'
import { Input, InputGroup } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useUpsertUser } from '@/lib/mutations'
import { createUserSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CurrencyDollarIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

function CreateUserForm(departments) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
    clearErrors,
  } = useForm({ resolver: zodResolver(createUserSchema) })
  const router = useRouter()
  const upsertMutation = useUpsertUser()

  async function onSubmit(data) {
    const upsert = {
      userId: 0,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      jobTitle: data.jobTitle,
      gender: data.gender,
      department: data.department,
      salary: data.salary,
      avgSalary: 0,
      active: true,
      dateHired: new Date().toISOString(),
      dateExited: '1900-01-01T22:56:38.542Z',
    }
    try {
      const result = await upsertMutation.mutateAsync(upsert)
      reset()

      if (result.status === 200) {
        toast.success('Employee created successfully')
        router.push(`/dashboard`)
      }
    } catch (error) {
      console.error('Error creating user in:', error)
      setError('form', { type: 'server', message: error.message })
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 max-w-4xl lg:mt-8">
      <Heading>New Employee</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee First Name</Subheading>
          <Text>Please enter the legal first name of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee First Name"
              name="firstName"
              defaultValue=""
              placeholder="Ernesto"
              {...register('firstName')}
            />

            {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
          </Field>
        </div>
      </section>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Last Name</Subheading>
          <Text>Please enter the legal last name of the employee.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee Last Name"
              name="lastName"
              defaultValue=""
              placeholder="Gallardo"
              {...register('lastName')}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
          </Field>
        </div>
      </section>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Gender</Subheading>
          <Text>Please enter the employee gender.</Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Employee Gender"
              name="gender"
              defaultValue=""
              placeholder="male or female"
              {...register('gender')}
            />
            {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Job Title</Subheading>
          <Text>
            Specify the role or position within the organization (e.g., &quot;Software Engineer&quot; or &quot;Marketing
            Manager&quot;).
          </Text>
        </div>
        <div>
          <Field>
            <Input
              aria-label="Job Title"
              name="jobTitle"
              placeholder="Sales Associate"
              {...register('jobTitle')}
            />
            {errors.jobTitle && <ErrorMessage>{errors.jobTitle.message}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Department</Subheading>
          <Text>
            Select the department where the employee will be working (e.g., &quot;Engineering,&quot; &quot;HR,&quot; or
            &quot;Sales&quot;).
          </Text>
        </div>

        <Controller
          control={control}
          name="department"
          defaultValue={departments.departments[0].Department}
          render={({ field }) => (
            <DepartmentListBox onChange={field.onChange} value={field.value} departments={departments.departments} />
          )}
        />
      </section>
      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Employee Email</Subheading>
          <Text>Enter the official work email address for the employee.</Text>
        </div>
        <div className="space-y-4">
          <Field>
            <Input
              type="email"
              aria-label="Employee Email"
              name="email"
              defaultValue=""
              placeholder="johnsmith@example.com"
              {...register('email')}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Annual Salary</Subheading>
          <Text>Specify the employee&apos;s yearly salary in USD</Text>
        </div>
        <InputGroup>
          <CurrencyDollarIcon className="size-5 text-stone-900 dark:text-stone-500" />
          <Field>
            <Input
              aria-label="Employee Name"
              name="salary"
              defaultValue=""
              placeholder="70000"
              {...register('salary')}
            />
            {errors.salary && <ErrorMessage>{errors.salary.message}</ErrorMessage>}
          </Field>
        </InputGroup>
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="submit">Add</Button>
      </div>
    </form>
  )
}

export default CreateUserForm
