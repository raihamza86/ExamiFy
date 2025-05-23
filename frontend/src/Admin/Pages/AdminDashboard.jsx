import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-4 lg:ml-[250px]">
    
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:col-span-2">
        
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-500 text-sm mb-2">Active Students</h2>
            <p className="text-3xl font-bold">34</p>
            <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          </div>

          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-500 text-sm mb-2">Active Test</h2>
            <p className="text-3xl font-bold">73</p>
            <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          </div>

          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-500 text-sm mb-2">Av. session</h2>
            <p className="text-3xl font-bold">26 min</p>
            <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          </div>

          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-500 text-sm mb-2">Assignments submitted</h2>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold">62</p>
              <span className="text-sm text-green-600 font-semibold">+7.5%</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          </div>
        </div>

      
        <div className="flex flex-col space-y-4">
          
          <div className="bg-white rounded-lg shadow p-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-700 text-lg font-bold">18 New assignments</h2>
                <p className="text-xs text-gray-400">Last 7 days</p>
              </div>
            </div>

            
            <div className="mt-4 space-y-3">
            
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Compositions</span>
                  <span className="text-sm text-gray-600">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Worksheets</span>
                  <span className="text-sm text-gray-600">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
            
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Performances</span>
                  <span className="text-sm text-gray-600">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: Assignment success (circular chart) */}
          <div className="bg-white rounded-lg shadow p-4 flex-1 flex items-center justify-center">
            <div>
              <h2 className="text-gray-700 text-lg font-bold text-center">Assignment success</h2>
              <p className="text-xs text-gray-400 text-center">Last 7 days</p>

              {/* Circular Chart (Simple static version) */}
              <div className="relative flex items-center justify-center mt-4">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    fill="none"
                    stroke="#e5e7eb" /* gray-200 */
                    strokeWidth="10"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    fill="none"
                    stroke="#10b981" /* green-500 */
                    strokeWidth="10"
                    strokeDasharray="314" /* circumference of circle (~2*pi*r) */
                    strokeDashoffset="31"  /* (314 - (314 * 0.90)) => 90% */
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xl font-bold">90%</span>
                  <div className="text-xs text-gray-500">Positive grades</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
