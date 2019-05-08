package odoo

import (
	"github.com/batazor/gitlab-exporter/pkg/utils"
	"github.com/prometheus/client_golang/prometheus"
	"log"
	"strconv"
)

var (
	totalCRMLead = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "odoo_crm_lead",
		Help: "odoo_crm_lead",
	}, []string{"id", "partner_id", "name"})
)

func init() {
	prometheus.MustRegister(totalCRMLead)
}

type crm_lead struct {
	id         int
	name       string
	partner_id int
	active     bool
}

func metricCRMLead() {
	rows, err := db.Query("SELECT id,name,active FROM crm_lead")
	if err != nil {
		logger.Error(err.Error())
		return
	}
	defer rows.Close()

	leadsRes := make([]*crm_lead, 0)
	for rows.Next() {
		bk := new(crm_lead)
		err := rows.Scan(&bk.id, &bk.name, &bk.active)
		if err != nil {
			log.Fatal(err)
		}
		leadsRes = append(leadsRes, bk)
	}

	for _, bk := range leadsRes {
		// export sum weight
		totalCRMLead.WithLabelValues(strconv.Itoa(bk.id), strconv.Itoa(bk.partner_id), bk.name).Set(utils.BoolToInt(bk.active))
	}
}
