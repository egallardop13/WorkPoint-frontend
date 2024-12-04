import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'

// {
//     "postId": 0,
//     "userId": 0,
//     "postTitle": "string",
//     "postContent": "string",
//     "postCreated": "2024-12-03T02:50:55.648Z",
//     "postUpdated": "2024-12-03T02:50:55.648Z"
//   }

const posts = [
  {
    postId: 1,
    userId: 1,
    postTitle: 'Test',
    postContent:
      'Test for the testing post lets make it longer to test the testing content of this testing post for the testing of posts',
    postCreated: '2024-12-03T02:50:55.648Z',
    postUpdated: '2024-12-03T02:50:55.648Z',
  },
]

const page = () => {
  return (
    <>
      <Heading>Kanban Board</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
      </div>
      <Divider className="mt-4" />
      <div className="mt-8 grid h-screen gap-3 lg:grid-cols-3">
        <div className="no-scrollbar h-full max-h-[70%] overflow-y-scroll rounded-lg border border-zinc-950/5 dark:border-white/10">
          <h1 className="mt-2 flex justify-center">To Do</h1>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="relative mt-2 max-w-sm border-2 border-red-500">
              <div className="flex w-full max-w-sm flex-col items-center justify-center overflow-hidden">
                Task {posts[0].postId}
                <h2 className="">{posts[0].postTitle}</h2>
                <div className="relative flex">
                  <p className="m-2 flex flex-wrap items-start justify-start overflow-hidden truncate text-ellipsis">
                    {posts[0].postContent}
                  </p>
                </div>
                <div>Labels</div>
              </div>
            </div>
            <div className="mt-2 h-[150px] w-[200px] border-2 border-red-500"></div>
            <div className="mt-2 h-[150px] w-[200px] border-2 border-red-500"></div>
            <div className="mt-2 h-[150px] w-[200px] border-2 border-red-500"></div>
          </div>
        </div>
        <div className="h-full max-h-[70%] rounded-lg border border-zinc-950/5 dark:border-white/10">
          <h1 className="mt-2 flex justify-center">In Progress</h1>
        </div>
        <div className="h-full max-h-[70%] rounded-lg border border-zinc-950/5 dark:border-white/10">
          <h1 className="mt-2 flex justify-center">Done</h1>
        </div>
      </div>
    </>
  )
}

export default page
