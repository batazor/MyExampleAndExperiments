package utils

func BoolToInt(b bool) float64 {
	if b {
		return float64(1)
	}
	return float64(0)
}
