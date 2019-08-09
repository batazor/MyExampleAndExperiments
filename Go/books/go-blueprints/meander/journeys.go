package meander

import "strings"

type j struct {
	Name       string
	PlaceTypes []string
}

// Journeys ...
var Journeys = []interface{}{
	&j{Name: "Romantic", PlaceTypes: []string{"park", "bar", "movie_theater", "restaurant", "florist", "taxi_stand"}},
	&j{Name: "Shopping", PlaceTypes: []string{"department_store", "cafe", "clothing_tore", "jewelry_store", "shoe_store"}},
	&j{Name: "Night Out", PlaceTypes: []string{"bar", "casino", "food", "night_club", "hospital"}},
	&j{Name: "Culture", PlaceTypes: []string{"museum", "cafe", "cemetry", "library", "art_gallery"}},
	&j{Name: "Pamper", PlaceTypes: []string{"hair_care", "beauty_salon", "cafe", "spa"}},
}

func (j *j) Public() interface{} {
	return map[string]interface{}{
		"name":    j.Name,
		"journey": strings.Join(j.PlaceTypes, "|"),
	}
}
