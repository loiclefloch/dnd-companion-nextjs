import clsx from 'clsx'

function Button({ children, className, variant = "none", size = "medium", color, ...props }) {
	return (
		<button
			type="button"
			className={clsx("flex justify-center w-full p-2 uppercase", {
				"p-2": size === "medium",
				"p-1": size === "medium",
				"p-0 px-1": size === "small",

				// "": color === "primary",
				// "": color === "secondary",

				"text-green-400 border-green-400": color === "success",
				"bg-green-400": color === "success" && variant === "contained",
				"border-green-400": color === "success" && variant === "outlined",

				"text-orange-400 border-orange-400": color === "warning",
				"bg-orange-400": color === "warning" && variant === "contained",
				"border-orange-400": color === "warning" && variant === "outlined",

				"text-red-400 border-red-400": color === "error",
				"bg-red-400": color === "error" && variant === "contained",
				"border-red-400": color === "error" && variant === "outlined",

				// "": color === "info",
				// "": color === "warning",

				"border-t border-solid border-slate-300 bg-slate-300 text-black": variant === "contained",
				"border border-solid bg-none": variant === "outlined",
				"border-slate-300 ": variant === "outlined" && !color,
				"border-none": variant === "text",
				"bg-slate-800 text-white border-slate-800": variant === "cta"
			}, className)} {...props}
		>
			{children}
		</button>
	)
}

export default Button