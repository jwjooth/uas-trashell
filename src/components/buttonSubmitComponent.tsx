import { useFormStatus } from "react-dom"
type ButtonSubmitProps = {
    label: string;
}

const ButtonSubmitComp: React.FC<ButtonSubmitProps> = ({label}) => {
    const { pending } = useFormStatus();
    return (
        <div className="flex justify-center">
            <button disabled={pending} 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-lg font-semibold text-base transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {label}
            </button>
        </div>
    )
}
export default ButtonSubmitComp;