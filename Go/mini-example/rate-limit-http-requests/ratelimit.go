package main

import (
  "sync"
  "golang.org/x/time/rate"
)

// IPRateLimiter
type IPRateLimiter struct {
  ips map[string]*rate.Limiter
  mu *sync.RWMutex
  r rate.Limit
  b int
}

// NewIPRangeLimiter
func NewIPRateLimiter(r rate.Limit, b int) *IPRateLimiter {
  i := &IPRateLimiter{
    ips: make(map[string]*rate.Limiter),
    mu: &sync.RWMutex{},
    // Limit defines the maximum frequency of some events.
    // Limit is represented as number of events per second. A zero Limit allows no events.
    r: r,
    b: b,
  }

  return i
}

// AddIP creates a new rate limiter and adds it to the ips map,
// using the IP address as the key
func (i *IPRateLimiter) AddIP(ip string) *rate.Limiter {
  i.mu.Lock()
  defer i.mu.Unlock()

  limiter := rate.NewLimiter(i.r, i.b)

  i.ips[ip] = limiter

  return limiter
}

// GetLimiter returns the rate limiter for the provided IP address if it exists.
// Otherwise calls AddIP to add IP address to the map
func (i *IPRateLimiter) GetLimiter(ip string) *rate.Limiter {
  i.mu.Lock()
  limiter, exists := i.ips[ip]
  i.mu.Unlock()

  if !exists {
    return i.AddIP(ip)
  }

  return limiter
}
