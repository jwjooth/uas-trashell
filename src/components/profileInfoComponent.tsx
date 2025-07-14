type ProfileInfoProps = {
    label: string;
    value: string;
}
const ProfileInfoComp: React.FC<ProfileInfoProps> = ({label, value}) => {
    return (
        <div className="flex justify-between items-center py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300">
            <span className="text-sm md:text-base font-medium text-gray-600">{label}</span>
            <span className="text-sm md:text-base font-semibold text-gray-900 text-right font-mono tracking-wide">{value}</span>
        </div>
    )
}
export default ProfileInfoComp;