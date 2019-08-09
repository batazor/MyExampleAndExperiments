package main

import (
	"fmt"
	"gopkg.in/urfave/cli.v1"
)

func main() {
	app := cli.NewApp()
	app.Usage = "Count up or down."
	app.Commands = []cli.Command{
		{
			Name:      "up",
			ShortName: "u",
			Usage:     "Count Up",
			Flags: []cli.Flag{
				cli.IntFlag{
					Name:  "stop, s",
					Usage: "Value to count up to",
					Value: 10,
				},
			},
			Action: func(c *cli.Context) error {
				start := c.Int("stop")
				if start <= 0 {
					fmt.Println("stop cannot be negative.")
				}
				for i := 1; i <= start; i++ {
					fmt.Println(i)
				}
				return nil
			},
		},
	}
}
