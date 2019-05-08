package gOffice

import (
	"fmt"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/sheets/v4"
	"io/ioutil"
	"log"
	"time"
)

func Run() {
	b, err := ioutil.ReadFile("auth/credentials.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}

	// If modifying these scopes, delete your previously saved token.json.
	config, err := google.ConfigFromJSON(b, "https://www.googleapis.com/auth/spreadsheets")
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}
	client := getClient(config)

	srv, err := sheets.New(client)
	if err != nil {
		log.Fatalf("Unable to retrieve Sheets client: %v", err)
	}

	// Prints the names and majors of students in a sample spreadsheet:
	// https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
	spreadsheetId := "1QchEyj5TRugxX28Gv7Hyf3vK023h2r2x0yRYgv7Xmp0"
	readRange := "Class Data!A2:E"
	resp, err := srv.Spreadsheets.Values.Get(spreadsheetId, readRange).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve data from sheet: %v", err)
	}

	if len(resp.Values) == 0 {
		fmt.Println("No data found.")
	} else {
		fmt.Println("Name, Major:")
		for _, row := range resp.Values {
			// Print columns A and E, which correspond to indices 0 and 4.
			fmt.Printf("%s, %s\n", row[0], row[4])
		}
	}

	loc, err := time.LoadLocation("America/New_York")

	var date time.Time
	vr := &sheets.ValueRange{
		Values: [][]interface{}{{date.In(loc).Format("2006-01-02"),
			date.In(loc).Format("15:04"),
			fmt.Sprintf("=B:B + \"hello\""),
			"",
			"=D:D - B:B",
			"ttt",
		}},
	}

	_, err = srv.Spreadsheets.Values.Append(spreadsheetId, readRange, vr).ValueInputOption("USER_ENTERED").Do()
	if err != nil {
		fmt.Println(err.Error())
	}
}
