//
// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/labels
//
import clsx from 'clsx'

function Tag({ label, children, rounded = false, className, size = "medium" }) {
  return (
    <span
      className={clsx(
        `font-semibold inline-block uppercase rounded select-none last:mr-0`,
        'border-solid ', // in case we want it custom with a border
        {
          "rounded-full": rounded,
          "py-1 px-2 text-xs": size === "medium",
          "py-0.5 px-2 text-2xs": size === "small",
        },
        className
      )}
    >
      <span className='flex items-center'>
        {children || label}
      </span>
    </span>
  );
}

export default Tag;
