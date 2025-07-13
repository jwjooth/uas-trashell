import InputComp from "./inputComponent"
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
type InputPasswordProps = {
    label: string;
    placeholder: string;
    id: string;
    name: string;
    required?: boolean;
    error?: string[];
    defaultValue?: string;
}


const InputPasswordComp: React.FC<InputPasswordProps> = ({label, placeholder, id, name, required, error, defaultValue}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative">
            <InputComp label={label} placeholder={placeholder} id={id} name={name} type={showPassword ? "Text" : "password"} required={required} error={error} defaultValue={defaultValue}/>
            <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            className= {` absolute right-3 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors p-1 ${ error ? 'bottom-5' : 'bottom-0'}`}> 
                {showPassword ? <FaEye/> : <FaEyeSlash/>}
            </button>
        </div>
    )
}
export default InputPasswordComp;