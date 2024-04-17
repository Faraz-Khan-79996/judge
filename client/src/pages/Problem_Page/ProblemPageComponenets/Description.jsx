export default function Description({name , description , }) {
  return (
    <div className="container">
      <h1 className="mt-5 mb-4 tw-font-bold tw-text-6xl">{name}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }} >
      </div>
    </div>
  )
}