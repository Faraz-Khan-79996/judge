export default function Description({name , description , }) {
  return (
    <div className="container dark:tw-text-white">
      <h1 className="mt-5 mb-4 tw-font-bold tw-text-6xl">{name}</h1>
      <div className="tw-prose tw-max-w-none dark:!tw-text-white" dangerouslySetInnerHTML={{ __html: description }} >
      </div>
    </div>
  )
}