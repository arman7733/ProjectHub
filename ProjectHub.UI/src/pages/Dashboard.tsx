import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, ListTodo, Users, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const stats = [
  { title: 'Total Projects', value: '12', icon: FolderKanban, color: 'text-primary' },
  { title: 'Active Tasks', value: '48', icon: ListTodo, color: 'text-info' },
  { title: 'Team Members', value: '24', icon: Users, color: 'text-success' },
  { title: 'Pending Reviews', value: '8', icon: Clock, color: 'text-warning' },
];

const projectData = [
  { name: 'Jan', projects: 4 },
  { name: 'Feb', projects: 6 },
  { name: 'Mar', projects: 8 },
  { name: 'Apr', projects: 10 },
  { name: 'May', projects: 9 },
  { name: 'Jun', projects: 12 },
];

const taskStatusData = [
  { name: 'To Do', value: 18, color: '#3b82f6' },
  { name: 'In Progress', value: 22, color: '#f59e0b' },
  { name: 'Done', value: 8, color: '#10b981' },
];

const recentProjects = [
  { name: 'E-commerce Platform', progress: 75, status: 'In Progress' },
  { name: 'Mobile App Redesign', progress: 45, status: 'In Progress' },
  { name: 'API Integration', progress: 90, status: 'Review' },
  { name: 'Dashboard Analytics', progress: 30, status: 'Planning' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your project overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{project.name}</div>
                  <Badge variant="secondary">{project.status}</Badge>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">{project.progress}% complete</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Task completed', user: 'John Doe', time: '2 hours ago' },
              { action: 'New project created', user: 'Sarah Johnson', time: '4 hours ago' },
              { action: 'Team member added', user: 'Mike Wilson', time: '6 hours ago' },
              { action: 'Project milestone reached', user: 'Emily Brown', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 border-l-2 border-primary pl-4">
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">by {activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
