type InputProps = {
    label: string;
    placeholder: string;
    id: string;
    name: string;
    type?: string;
    required?: boolean;
    error?: string[];
    defaultValue?: string;
}

const InputComp: React.FC<InputProps> = ({label, placeholder, id ,name, type = "text", required=false, error, defaultValue}) =>{
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2"
            >
                {label}
            </label>
            <input type={type} id={id} name={name} 
                defaultValue= {defaultValue}
                className={`text-black w-full px-4 py-3 bg-gray-50 border-2 rounded-lg text-base transition-all duration-300 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${ error ? 'border-red-500' : 'border-gray-200'}`}
                placeholder= {placeholder}
                required={required}

            />
            {error && (
                error.map((err, index) => (
                    <p className="text-red-500 text-xs font-medium mt-1" key={index}>
                        {err}
                    </p>
                ))
            )}
        </div>
    )
}
export default InputComp;