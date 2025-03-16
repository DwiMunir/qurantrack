"use client";

interface MonthlyProgressChartProps {
  monthlyData: Array<{
    month: string;
    pages: number;
  }>;
}

export function MonthlyProgressChart({ monthlyData }: MonthlyProgressChartProps) {
  // Find the maximum value for scaling
  const maxPages = Math.max(...monthlyData.map(item => item.pages), 10); // Minimum of 10 for scaling
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Progres Bulanan</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">{monthlyData.reduce((sum, item) => sum + item.pages, 0)}</span> halaman tahun ini
        </div>
      </div>
      
      <div className="h-64 flex items-end space-x-2">
        {monthlyData.map((item, index) => {
          const heightPercentage = item.pages > 0 ? (item.pages / maxPages) * 100 : 0;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center justify-end">
              <div className="relative w-full group">
                <div 
                  className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm hover:bg-blue-600 dark:hover:bg-blue-700 transition-all"
                  style={{ height: `${heightPercentage}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.pages} halaman
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.month}</div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {monthlyData.filter(item => item.pages > 0).length}
            </span> bulan aktif
          </div>
          <div>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {Math.round(monthlyData.reduce((sum, item) => sum + item.pages, 0) / 
                Math.max(1, monthlyData.filter(item => item.pages > 0).length))}
            </span> halaman/bulan
          </div>
        </div>
      </div>
    </div>
  );
}
