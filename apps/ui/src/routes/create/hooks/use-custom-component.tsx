import * as React from "react"

import type { CustomComponentSpec } from "@/routes/create/lib/custom-component-spec"

const STORAGE_KEY = "shadify:create:custom-component"

type PersistedState = {
  spec: CustomComponentSpec | null
  prompt: string | null
  version: number
}

type CustomComponentState = PersistedState & {
  buildingTitle: string | null
}

type CustomComponentContextValue = CustomComponentState & {
  beginBuild: (title: string) => void
  setSpec: (spec: CustomComponentSpec, prompt?: string) => void
  clear: () => void
}

const CustomComponentContext =
  React.createContext<CustomComponentContextValue | null>(null)

function loadFromStorage(): PersistedState {
  if (typeof window === "undefined") {
    return { spec: null, prompt: null, version: 0 }
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { spec: null, prompt: null, version: 0 }
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return {
      spec: parsed.spec ?? null,
      prompt: parsed.prompt ?? null,
      version: parsed.version ?? 0,
    }
  } catch {
    return { spec: null, prompt: null, version: 0 }
  }
}

export function CustomComponentProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = React.useState<CustomComponentState>(() => ({
    ...loadFromStorage(),
    buildingTitle: null,
  }))

  React.useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const { spec, prompt, version } = state
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ spec, prompt, version })
      )
    } catch {
      // quota or disabled storage — ignore
    }
  }, [state])

  const beginBuild = React.useCallback((title: string) => {
    setState({
      spec: null,
      prompt: null,
      version: 0,
      buildingTitle: title,
    })
  }, [])

  const setSpec = React.useCallback(
    (spec: CustomComponentSpec, prompt?: string) => {
      setState((prev) => ({
        spec,
        prompt: prompt ?? prev.prompt,
        version: prev.version + 1,
        buildingTitle: null,
      }))
    },
    []
  )

  const clear = React.useCallback(() => {
    setState({ spec: null, prompt: null, version: 0, buildingTitle: null })
  }, [])

  const value = React.useMemo<CustomComponentContextValue>(
    () => ({ ...state, beginBuild, setSpec, clear }),
    [state, beginBuild, setSpec, clear]
  )

  return (
    <CustomComponentContext.Provider value={value}>
      {children}
    </CustomComponentContext.Provider>
  )
}

export function useCustomComponent() {
  const ctx = React.useContext(CustomComponentContext)
  if (!ctx) {
    throw new Error(
      "useCustomComponent must be used inside CustomComponentProvider"
    )
  }
  return ctx
}
