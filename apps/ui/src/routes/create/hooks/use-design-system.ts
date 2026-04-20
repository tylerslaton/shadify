
import { getPresetCode } from "@/routes/create/lib/preset-code"
import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params"

// Returns the canonical preset code derived from the current search params.
export function usePresetCode() {
  const [params] = useDesignSystemSearchParams()

  return getPresetCode(params)
}
