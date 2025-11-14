import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LayoutList, LayoutGrid } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Design user interface', description: 'Create mockups for the dashboard', status: 'todo', priority: 'high', assignee: 'John Doe' },
  { id: '2', title: 'Implement authentication', description: 'Add JWT-based auth', status: 'todo', priority: 'high', assignee: 'Sarah Johnson' },
  { id: '3', title: 'Setup database', description: 'Configure PostgreSQL', status: 'in-progress', priority: 'medium', assignee: 'Mike Wilson' },
  { id: '4', title: 'Create API endpoints', description: 'Build RESTful API', status: 'in-progress', priority: 'high', assignee: 'Emily Brown' },
  { id: '5', title: 'Write documentation', description: 'API documentation', status: 'done', priority: 'low', assignee: 'John Doe' },
];

function SortableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-move hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium">{task.title}</h3>
          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground">{task.assignee}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState<'list' | 'kanban'>('kanban');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const getTasksByStatus = (status: Task['status']) => tasks.filter((task) => task.status === status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-info text-info-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      case 'done':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your project tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setView('list')}>
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setView('kanban')}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="grid gap-4 md:grid-cols-3">
          {(['todo', 'in-progress', 'done'] as const).map((status) => (
            <div key={status} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold capitalize">{status.replace('-', ' ')}</h2>
                <Badge className={getStatusColor(status)}>{getTasksByStatus(status).length}</Badge>
              </div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={getTasksByStatus(status).map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {getTasksByStatus(status).map((task) => (
                      <SortableTask key={task.id} task={task} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                    <span className="text-sm text-muted-foreground">{task.assignee}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
