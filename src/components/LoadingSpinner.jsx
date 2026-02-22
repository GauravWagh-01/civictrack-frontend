export function LoadingSpinner() {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-[999] bg-gray-100/80 backdrop-blur-sm"
            role="status"
            aria-label="Loading"
        >
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-sm font-medium text-gray-700">
                        Loading CivicTrack...
                    </p>
                </div>
            </div>
        </div>
    );
}
