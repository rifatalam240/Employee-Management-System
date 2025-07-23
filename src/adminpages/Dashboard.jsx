// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { UserCheck, UserX, BadgeDollarSign } from 'lucide-react';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Chart.js components রেজিস্টার করা জরুরি
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const stats = {
//     totalEmployees: 20,
//     totalHRs: 5,
//     verified: 15,
//     fired: 2,
//     pendingPayrolls: 3,
//     completedPayments: 12,
//   };

//   const salaryChart = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Payments',
//         data: [1000, 1500, 1200, 2000, 1800, 2200],
//         backgroundColor: '#3b82f6',
//       },
//     ],
//   };

//   const verifyChart = {
//     labels: ['Verified', 'Unverified'],
//     datasets: [
//       {
//         data: [15, 5],
//         backgroundColor: ['#10b981', '#f43f5e'],
//       },
//     ],
//   };

//   return (
//     <div className="p-4 grid gap-6">
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <Card className="bg-blue-100">
//           <CardContent className="p-4 text-center">
//             <h3 className="text-xl font-bold">Employees</h3>
//             <p>{stats.totalEmployees}</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-green-100">
//           <CardContent className="p-4 text-center">
//             <h3 className="text-xl font-bold">HRs</h3>
//             <p>{stats.totalHRs}</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-yellow-100">
//           <CardContent className="p-4 text-center">
//             <h3 className="text-xl font-bold">Verified</h3>
//             <p>{stats.verified}</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-red-100">
//           <CardContent className="p-4 text-center">
//             <h3 className="text-xl font-bold">Fired</h3>
//             <p>{stats.fired}</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-indigo-100">
//           <CardContent className="p-4 text-center">
//             <h3 className="text-xl font-bold">Pending Payrolls</h3>
//             <p>{stats.pendingPayrolls}</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-purple-100">
//           <CardContent className="p-4 text-center">
//             <h3 className="text-xl font-bold">Completed Payments</h3>
//             <p>{stats.completedPayments}</p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardContent className="p-4">
//             <h3 className="text-lg font-semibold mb-2">Salary Chart</h3>
//             <Bar data={salaryChart} />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <h3 className="text-lg font-semibold mb-2">Verification Status</h3>
//             <Doughnut data={verifyChart} />
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="employees">
//         <TabsList className="grid grid-cols-2 w-full mb-4">
//           <TabsTrigger value="employees">All Employees</TabsTrigger>
//           <TabsTrigger value="payroll">Payroll Requests</TabsTrigger>
//         </TabsList>

//         <TabsContent value="employees">
//           <Card>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Role</TableHead>
//                     <TableHead>Verified</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>John Doe</TableCell>
//                     <TableCell>Employee</TableCell>
//                     <TableCell>Yes</TableCell>
//                     <TableCell className="flex gap-2">
//                       <Button variant="destructive" size="sm">
//                         <UserX className="w-4 h-4" /> Fire
//                       </Button>
//                       <Button size="sm">
//                         <UserCheck className="w-4 h-4" /> Make HR
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                   {/* আরও রো যুক্ত করতে পারো */}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="payroll">
//           <Card>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Month</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Action</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>Jane Smith</TableCell>
//                     <TableCell>July 2025</TableCell>
//                     <TableCell>$2000</TableCell>
//                     <TableCell>Pending</TableCell>
//                     <TableCell>
//                       <Button size="sm" className="bg-green-600 text-white">
//                         <BadgeDollarSign className="w-4 h-4" /> Pay
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                   {/* আরও রো যুক্ত করতে পারো */}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Dashboard;
