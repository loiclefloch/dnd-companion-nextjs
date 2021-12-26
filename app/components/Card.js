import Tag from "./Tag";

function Card({ isLoading, name, meta, data, description, tags }) {
  return (
    <div
      className="max-w-lg p-4 border shadow-sm"
      style={{
        // background: 'url("https://www.aidedd.org/images/fond-ph.jpg")',
      }}
    >
      <h4 className="text-lg">{name}</h4>
      <div className="text-sm">{meta}</div>
      {data && (
        <div className="my-4">
          {data
            .filter(Boolean)
            .filter((data) => data.value !== null && data.value !== undefined)
            .map((data) => (
              <div key={data.label}>
                <span className="font-semibold text-xs py-1">{data.label}:</span>
                &nbsp;
                <span>{data.value}</span>
              </div>
            ))}
        </div>
      )}
      <div>{description}</div>
      {tags && (
        <div className="flex flex-row mt-4">
          {tags.filter(Boolean).map((tag, index) => (
            <Tag key={index} color={tag.color}>
              {tag.label}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
