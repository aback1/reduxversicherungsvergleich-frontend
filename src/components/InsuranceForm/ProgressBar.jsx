export default function ProgressBar({width}) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-4 mb-4 rounded-full" style={{width: `${width}%` }}></div>
        </div>
    );
}