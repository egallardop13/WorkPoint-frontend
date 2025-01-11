'use client'
import { UpsertUser } from '@/app/api/users/create/actions'
import { DepartmentListBox } from '@/app/dashboard/settings/departmentListBox'
import { CurrencyDollarIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import { Divider } from '../ui/divider'
import { ErrorMessage, Field } from '../ui/fieldset'
import { Heading, Subheading } from '../ui/heading'
import { Input, InputGroup } from '../ui/input'
import { Select } from '../ui/select'
import { Text } from '../ui/text'

function EditUserForm({ user, departments, params }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    getValues,
    reset,
    control,
    clearErrors,
  } = useForm()
  const router = useRouter()
  const departmentsData = watch('department')
  console.log('departmentsData in edit:', departmentsData)
  const formValues = getValues()
  console.log('formValues in edit:', formValues)

  async function onSubmit(data) {
    console.log('wefqewrgqergqergqergqerg:', data)
    let dateExited = user.dateExited

    if (data.active !== user.active) {
      if (data.active) {
        dateExited = '1900-01-01T22:56:38.542Z'
      } else if (!data.active) {
        dateExited = new Date().toISOString()
      }
    }
    const upsert = {
      ...user,
      ...data,
      dateExited,
    }
    try {
      console.log('upsert in edit inside try:', upsert)
      const result = await UpsertUser(upsert)
      reset()

      if (result.status === 200) {
        toast.success('Employee edited successfully')
        router.push(`/dashboard/users/${user.userId}`)
      }
    } catch (error) {
      console.log('upsert in edit:', error)
      console.error('Error editing user in:', error)
      setError('form', { type: 'server', message: error.message })
      toast.error(error.message)
    }
  }
  return (
    console.log('user in edit:', user),
    (
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
                name="first_name"
                defaultValue={user.firstName}
                placeholder="John"
                {...register('firstName', { required: 'Please enter a first name' })}
              />
              {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
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
                name="last_name"
                defaultValue={user.lastName}
                placeholder="Smith"
                {...register('lastName', { required: 'Please enter a last name' })}
              />
              {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
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
                name="job_title"
                defaultValue={user.jobTitle}
                placeholder="Sales Associate"
                {...register('jobTitle', { required: 'Please enter a Job Title' })}
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
              Update the department where the employee will be working (e.g., &quot;Engineering,&quot; &quot;HR,&quot;
              or &quot;Sales&quot;).
            </Text>
          </div>
          {/* {console.log('departments in user edit adfasd', departments)} */}
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
                name="email"
                defaultValue={user.email}
                placeholder="johnsmith@example.com"
                {...register('email', { required: 'Please enter a email' })}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
                name="gender"
                defaultValue={user.gender}
                placeholder="male or female"
                {...register('gender', { required: 'Please enter a gender' })}
              />
              {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
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
                name="salary"
                defaultValue={user.salary}
                placeholder="70000"
                {...register('salary', {
                  required: 'Salary is required',
                  validate: {
                    isNumber: (value) => !isNaN(Number(value)) || 'Salary must be a number',
                    isPositive: (value) => Number(value) > 0 || 'Salary must be greater than 0',
                    maxLength: (value) => {
                      const [integerPart, decimalPart] = value.split('.')
                      return (
                        (integerPart.length <= 14 && (!decimalPart || decimalPart.length <= 4)) ||
                        'Salary must not exceed 14 digits before the decimal and 4 digits after'
                      )
                    },
                  },
                })}
              />
              {errors.salary && <ErrorMessage>{errors.salary.message}</ErrorMessage>}
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
              name="active"
              defaultValue={user.active}
              {...register('active', { required: 'Please select a status' })}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </Select>
            {errors.employee_status && <ErrorMessage>{errors.employee_status.message}</ErrorMessage>}
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
  )
}

export default EditUserForm
