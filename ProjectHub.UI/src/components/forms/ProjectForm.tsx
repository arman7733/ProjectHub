import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projectSchema, ProjectInput } from '@/lib/validations';
import { toast } from 'sonner';

interface ProjectFormProps {
  onSuccess?: () => void;
}

export function ProjectForm({ onSuccess }: ProjectFormProps) {
  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      managerId: '',
      deadline: '',
    },
  });

  const onSubmit = async (data: ProjectInput) => {
    try {
      // API call to create project
      // await api.post('/projects', data);
      toast.success('Project created successfully!');
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Project description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="managerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Manager</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440000">John Doe</SelectItem>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440001">Sarah Johnson</SelectItem>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440002">Mike Wilson</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </Form>
  );
}
