import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LeadGenROICalculator() {
  const [inputs, setInputs] = useState({
    serviceFeeA: 2000,
    installFeeB: 1000,
    adSpendDaily: 25,
    leadCost: 20,
    leadsPerDeal: 80,
    dealValue: 15000,
  })

  const [results, setResults] = useState(null)

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) })
  }

  const calculate = () => {
    const months = 12
    const adSpendMonthly = inputs.adSpendDaily * 30
    const adSpendYearly = adSpendMonthly * months

    const serviceFeeA = inputs.serviceFeeA * months
    const totalCostA = serviceFeeA + adSpendYearly
    const leadsA = adSpendYearly / inputs.leadCost
    const costPerLeadA = totalCostA / leadsA
    const dealsA = leadsA / inputs.leadsPerDeal
    const gciA = dealsA * inputs.dealValue
    const netRoiA = gciA - totalCostA

    const totalCostB = inputs.installFeeB + adSpendYearly
    const leadsB = adSpendYearly / inputs.leadCost
    const costPerLeadB = totalCostB / leadsB
    const dealsB = leadsB / inputs.leadsPerDeal
    const gciB = dealsB * inputs.dealValue
    const netRoiB = gciB - totalCostB

    setResults({
      A: { totalCost: totalCostA, costPerLead: costPerLeadA, deals: dealsA, gci: gciA, roi: netRoiA },
      B: { totalCost: totalCostB, costPerLead: costPerLeadB, deals: dealsB, gci: gciB, roi: netRoiB },
    })
  }

  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Lead Gen ROI Calculator</h2>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(inputs).map(([key, value]) => (
            <div key={key}>
              <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
              <Input type="number" name={key} value={value} onChange={handleChange} />
            </div>
          ))}
        </div>

        <Button className="mt-4" onClick={calculate}>Calculate</Button>

        {results && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {Object.entries(results).map(([option, data]) => (
              <div key={option} className="border rounded p-4">
                <h3 className="font-semibold">Option {option}</h3>
                <p>Total Cost: ${data.totalCost.toFixed(2)}</p>
                <p>Cost per Lead: ${data.costPerLead.toFixed(2)}</p>
                <p>Deals Closed: {data.deals.toFixed(2)}</p>
                <p>Estimated GCI: ${data.gci.toFixed(2)}</p>
                <p>Net ROI: ${data.roi.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
