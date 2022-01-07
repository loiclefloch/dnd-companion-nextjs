import clsx from 'clsx'

import BottomScreen from "./BottomScreen"
import Button from "./Button"
function ButtonBottomScreen({ children, className, ...props }) {
	return (
		<BottomScreen className="border-t border-solid border-slate-300" >
			<Button size="big" className={clsx("border-0", className)} {...props}>{children}</Button>
		</BottomScreen>
	
	)
}

export default ButtonBottomScreen