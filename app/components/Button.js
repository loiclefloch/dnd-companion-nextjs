import clsx from 'clsx'

function Button({ children, className, variant = "none", color, ...props }) {
	return (
		<button
			type="button"
			className={clsx("flex justify-center w-full p-2 uppercase", {
				"": color === "primary",
				"": color === "secondary",
				"text-green-400 border-green-400": color === "success",
				"bg-green-400": color === "success" && variant === "contained",
				"": color === "error",
				"": color === "info",
				"": color === "warning",

				"border-t border-solid border-slate-300 bg-slate-300 text-black": variant === "contained",
				"border border-solid border-slate-300 bg-none": variant === "outlined",
				"border-none": variant === "text",
				"bg-slate-800 text-white border-slate-800": variant === "cta"
			}, className)} {...props}
		>
			{children}
		</button>
	)
}

export default Button