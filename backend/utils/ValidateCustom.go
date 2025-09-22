package utils

import "unicode"

func IsValid(s string) (bool) {
	if len(s) < 6 {
		return false
	}

	digits := 0
	hasUpper := false
	hasLower := false

	for _, ch := range s {
		switch {
		case unicode.IsDigit(ch):
			digits++
		case unicode.IsUpper(ch):
			hasUpper = true
		case unicode.IsLower(ch):
			hasLower = true
		}
	}

	if digits < 2 {
		return false
	}
	if !hasUpper {
		return false
	}
	if !hasLower {
		return false
	}

	return true
}