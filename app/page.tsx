'use client'

import { useEffect, useState } from 'react'
import { Rocket, Cpu, Video, ListTodo, Activity, AlertCircle } from 'lucide-react'

const NOCODB_URL = process.env.NEXT_PUBLIC_NOCODB_URL || 'https://nocodb-lina.apogeuautomacao.cloud'
const NOCODB_TOKEN = process.env.NEXT_PUBLIC_NOCODB_TOKEN || ''

interface Task {
  id: string
  title: string
  status: string
  priority: string
  due_date: string
  assigned_to?: string
  tags?: string | null
}

interface HealthCheck {
  id: string
  service: string
  status: string
  uptime_percent: number
  last_check: string
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [health, setHealth] = useState<HealthCheck[]>([])
  const [selectedWidget, setSelectedWidget] = useState('all')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setError(null)
      // Fetch tasks
      const tasksRes = await fetch(`${NOCODB_URL}/api/v2/tables/mxcq2y76r0m9ghb/records`, {
        headers: { 'xc-token': NOCODB_TOKEN },
      })
      if (!tasksRes.ok) throw new Error('Failed to fetch tasks')
      const tasksData = await tasksRes.json()
      setTasks(tasksData.list || [])

      // Fetch health checks
      const healthRes = await fetch(`${NOCODB_URL}/api/v2/tables/mmj6r34w0ahefxh/records`, {
        headers: { 'xc-token': NOCODB_TOKEN },
      })
      if (!healthRes.ok) throw new Error('Failed to fetch health data')
      const healthData = await healthRes.json()
      setHealth(healthData.list || [])

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const getTaskTags = (task: Task) => (task.tags || '').toLowerCase()

  const filteredTasks = selectedWidget === 'all'
    ? tasks
    : tasks.filter(t => {
        const tags = getTaskTags(t)
        if (selectedWidget === 'founder') return tags.includes('founder')
        if (selectedWidget === 'dev') return tags.includes('dev')
        if (selectedWidget === 'creator') return tags.includes('content')
        return false
      })

  const pendingTasks = filteredTasks.filter(t => t.status === 'pending')
  const doneTasks = filteredTasks.filter(t => t.status === 'done')
  const highPriorityTasks = pendingTasks.filter(t => t.priority === 'high')

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'healthy': return 'text-green-500'
      case 'unhealthy': return 'text-red-500'
      default: return 'text-yellow-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">🪷 Lina Dashboard</h1>
          <p className="text-muted-foreground">Mission Control - Gestão de Projetos e Automações</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-destructive font-medium">Erro ao carregar dados</p>
              <p className="text-destructive/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Widget Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedWidget('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedWidget === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedWidget('founder')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedWidget === 'founder'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            🚀 Founder
          </button>
          <button
            onClick={() => setSelectedWidget('dev')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedWidget === 'dev'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            🔧 Dev
          </button>
          <button
            onClick={() => setSelectedWidget('creator')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedWidget === 'creator'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            🎬 Criador
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <ListTodo className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Tasks</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{filteredTasks.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Pendentes</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{pendingTasks.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Rocket className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Concluídas</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{doneTasks.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm text-muted-foreground">Alta Prioridade</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{highPriorityTasks.length}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Tasks List */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-foreground mb-4">📋 Tasks</h2>
            {filteredTasks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Nenhuma task encontrada</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{task.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {task.priority === 'high' && (
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-500 rounded">Alta</span>
                          )}
                          {task.due_date && (
                            <span>📅 {new Date(task.due_date).toLocaleDateString('pt-BR')}</span>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === 'done'
                          ? 'bg-green-500/20 text-green-500'
                          : task.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-gray-500/20 text-gray-500'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Health Status */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-foreground mb-4">🏥 Health Status</h2>
            {health.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Nenhum dado de health disponível</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {health.map(h => (
                  <div
                    key={h.id}
                    className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Cpu className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">{h.service}</span>
                      </div>
                      <span className={`font-bold ${getStatusColor(h.status)}`}>
                        {h.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Uptime: {h.uptime_percent}%</span>
                      <span>
                        Check: {new Date(h.last_check).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Widget */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Criador - Conteúdo</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Tasks de Conteúdo</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {tasks.filter(t => getTaskTags(t).includes('content') && t.status === 'pending').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {tasks.filter(t => getTaskTags(t).includes('content') && t.status === 'done').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Concluídas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Desenvolvido com ❤️ pela Lina COO</p>
        </div>
      </div>
    </div>
  )
}
