/**
 * Submission-to-Quote Underwriting Flow Platform
 * JavaScript State Management, Dynamic LOB Filter, Priority & FIFO Queue Engine
 */

// ============================================================================
// 1. MASTER SUBMISSIONS DATASET (5 LINES OF BUSINESS × BROKER & DIRECT PORTALS)
// ============================================================================
const SUBMISSIONS_DATASET = [
  // --------------------------------------------------------------------------
  // 1. TRUCKING / COMMERCIAL AUTO
  // --------------------------------------------------------------------------
  {
    id: "SUB-48213-TX",
    lobKey: "trucking",
    lobName: "Commercial Auto / Trucking",
    channelType: "broker", // 'broker' | 'direct'
    channelName: "Broker Intake: Marsh & McLennan (Email)",
    priority: "P1", // 'P1' | 'P2' | 'P3' | 'P4'
    priorityScore: 96,
    slaText: "4h Fast-Track SLA",
    slaCountdown: "3h 45m remaining",
    priorityReason: "Tier-1 Platinum Broker • Clean Appetite Match • Approaching Effective Date",
    // Unified Account View demo: parent account grouping across LOBs.
    accountName: "Apex Freight Holdings",
    insured: "Apex Freight LLC",
    fein: "81-440000TX",
    dot: "3194022",
    address: "10440 Highway 290 West, Suite 400, Houston, TX 77040",
    broker: "Marsh & McLennan Commercial Brokerage",
    email: "submissions@marshbrokerage.com",
    desk: "Specialty Transportation & Fleet UW Team",
    underwriter: "Sarah Jenkins (Senior Fleet UW)",
    exposure: "$1,850,000",
    exposureVal: 1850000,
    authorityLimit: 2000000,
    receivedAt: "2026-08-25 09:14 AM",
    receivedTimestamp: 1787658840000,
    statusText: "Intake Ingested",
    statusBadge: "badge-primary",
    currentStep: 1,
    completedSteps: [],
    docs: [
      { name: "ACORD_137_Commercial_Auto_Application.pdf", type: "pdf", desc: "Application Form • 4 Pages • 1.4 MB" },
      { name: "Apex_Freight_Vehicle_SOV_Schedule.xlsx", type: "xls", desc: "Statement of Values (SOV) • 12 Units • 420 KB" },
      { name: "Prior_3_Years_Loss_Runs_Official.pdf", type: "pdf", desc: "Loss Run History • 2 Claims Logged • 2.1 MB" },
      { name: "Driver_MVR_Verification_Report_2026.pdf", type: "pdf", desc: "Official MVR Audit • 100% Active Verified • 850 KB" },
      { name: "FMCSA_Safety_Inspection_Certificate.pdf", type: "pdf", desc: "FMCSA Compliance Audit • Grade A • 1.2 MB" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "DOT / MC Number", val: "USDOT 3194022", conf: "99.8%" },
      { key: "Total Power Units", val: "12 Tractor Units", conf: "99.5%" },
      { key: "Operating Radius", val: "450 Miles (Regional)", conf: "98.9%" },
      { key: "Cargo Type", val: "Dry Van / General Freight", conf: "99.2%" },
      { key: "Garaging Location", val: "Harris County, TX", conf: "99.0%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48213-TX",
      source_channel: "Broker Intake (Email / ACORD)",
      applicant: {
        legal_name: "Apex Freight LLC",
        fein: "81-440000TX",
        dot_number: "3194022",
        fleet_size: 12,
        operating_radius_miles: 450,
        garaged_state: "TX"
      },
      loss_history: {
        total_incurred: 14200,
        claims_3yr: 2,
        loss_ratio: "18.4%"
                                                                 },
      enrichment: {
        fmcsa_safety_percentile: 94,
        iss_score: "Pass (No Action Required)",
        driver_mvr_clean_rate: "91.6%"
      }
    },
    appetiteRules: [
      { ruleId: "UW-001", category: "Underwriting", factor: "Maximum Fleet Size", operator: "<=", baseValue: 100, unit: "Vehicles", canOverride: true, guardrail: "<= 150", val: "12 Vehicles", pass: true },
      { ruleId: "UW-002", category: "Underwriting", factor: "Maximum Vehicle Age", operator: "<=", baseValue: 15, unit: "Years", canOverride: false, guardrail: "<= 15", val: "6 Years", pass: true },
      { ruleId: "UW-003", category: "Underwriting", factor: "Minimum Driver Experience", operator: ">=", baseValue: 2, unit: "Years", canOverride: true, guardrail: ">= 2", val: "5 Years", pass: true },
      { ruleId: "UW-004", category: "Underwriting", factor: "Maximum 3-Yr Loss Ratio", operator: "<=", baseValue: 60, unit: "%", canOverride: true, guardrail: "<= 60%", val: "18.4%", pass: true },
      { ruleId: "UW-005", category: "Underwriting", factor: "Hazardous Cargo Allowed", operator: "=", baseValue: "Yes", unit: "Yes/No", canOverride: true, guardrail: "Carrier permits; MGA may restrict", val: "No (General Dry Van)", pass: true }
    ],
    enrichmentCards: [
      { title: "FMCSA / DOT Safety Score", icon: "ph-truck", val: "94th Percentile", label: "ISS-D Recommendation: PASS", tag: "badge-success" },
      { title: "DOT Inspection Violations", icon: "ph-warning", val: "0.12 / 100k mi", label: "National Average: 0.48 (Superior)", tag: "badge-success" },
      { title: "Experian Commercial Credit", icon: "ph-chart-pie", val: "88 / 100", label: "Low Financial Default Risk", tag: "badge-info" }
    ],
    subjectivities: [
      "Receipt and satisfactory verification of 100% driver MVRs prior to bind.",
      "Submission of signed Statement of Values with vehicle VIN verification.",
      "Receipt of pre-employment drug and alcohol testing protocol document."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Minor fender damage during backing maneuver", status: "Closed", incurred: "$4,200" },
      { year: "2023 - 2024", desc: "Windshield replacement & minor debris strike", status: "Closed", incurred: "$1,800" },
      { year: "2022 - 2023", desc: "No claims recorded", status: "Clean", incurred: "$0" }
    ],
    insured_id: 748921043,
    submission_id: "SUB-48213-TX",
    quote_id: "QT-TRK-2026-89412",
    endorsement_number: 0,
    broker_fee: { amount: 2574, default: 1 },
    genInfo: {
      quotetype: "Commercial Auto / Trucking",
      application_type_id: 483,
      company: 210,
      lob: "trucking",
      policytype: "New Business",
      billtype: "Agency Bill",
      effective_date: "09/01/2026",
      expiration_date: "09/01/2027",
      lock_rate_effective_date: "08/25/2026",
      business_yrs_exp: "5",
      binding: "pending",
      al_check: true,
      cargo_check: true,
      pd_check: true
    },
    insuredInfo: {
      entity_type: "Corporation / LLC",
      insured_name: "Apex Freight LLC",
      fein: "81-440000TX",
      dot_number: "3194022",
      address: "10440 Highway 290 West, Suite 400, Houston, TX 77040",
      insured_garaging_city: "Suite 400",
      insured_garaging_state: "Houston",
      insured_garaging_county: "Suite 400 County",
      years_of_experience: 5,
      dot_yes_no: "Yes",
      icc_filings_yes_no: "No",
      description_of_operation: "Tier-1 Platinum Broker • Clean Appetite Match • Approaching Effective Date"
    },
    coveragesInfo: {
      rating_type: "Composite Rating Engine",
      liability: 1850000,
      al_deductions: 0,
      pd: "Yes",
      cargo: "Yes",
      cargo_limit: 250000,
      pd_high_deductible: "5000",
      pd_deductible_amount: 2500,
      naics_code: 484110,
      rating_class: 5,
      dashcam: "No",
      al_check: true,
      pd_check: true,
      cargo_check: true,
      towing: "10000"
    },
    filingInfo: {
      safer_factor: "1.0",
      FMCSA_alert: "0",
      uw_credit_debit_factor: "0.95"
    },
    radiusOfOperationsInfo: {
      radius: 450,
      Intrastate_interstate: "Interstate"
    },
    serviceInspectionInfo: {
      number_of_inspection_si: 0,
      oos_violation_si: 0,
      account_percent_si: "-",
      account_percent_driver: "-"
    },
    commoditiesSelected: [1, 2],
    commoditiesInfo: { secondary_class: "Commercial Auto / Trucking" },
    uwReviewInfo: {
      driver_factor: 1,
      og_driver_count: 12,
      cr_driver_count: 5,
      al_pollution: "Low",
      al_pollution_factor: "1.00",
      uw_credit_debit_factor: "1.0",
      loss_experience_factor: "1.0",
      min_earn_factor: 25,
      broker_fee_amount: 2574,
      original_driver_exclude_count: 0
    },
    vehicles: [
      {
        id: 903100,
        xid: 1,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$36,200.00",
        liability_premium: "$36,200.00",
        pd_premium: "$36,200.00"
      },
      {
        id: 903101,
        xid: 2,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$10,252.00",
        liability_premium: "$10,252.00",
        pd_premium: "$10,252.00"
      },
      {
        id: 903102,
        xid: 3,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$2,148.00",
        liability_premium: "$2,148.00",
        pd_premium: "$2,148.00"
      }
    ],
    drivers: [
      {
        id: 942561,
        given_name: "Apex",
        last_name: "Freight LLC",
        dob: "01/01/1990",
        licensestate: "Houston",
        licenseclasstype: "Class A",
        experience: "5 Years",
        tenure: 3,
        exclude: 0,
        status: "Active Verified",
        driver_factor: 1
      }
    ],
    quoteNo: "QT-TRK-2026-89412",
    coverageRows: [
      { line: "Commercial Auto Liability (Combined Single Limit)", limit: "$1,850,000 CSL", ded: "$2,500", prem: "$36,200.00" },
      { line: "Auto Physical Damage (Comp & Collision - 12 Units)", limit: "$1,850,000 Stated Value", ded: "$2,500", prem: "$10,252.00" },
      { line: "Motor Truck Cargo Legal Liability", limit: "$250,000 Per Occurrence", ded: "$1,000", prem: "$2,148.00" }
    ]
  },

  {
    id: "SUB-48901-TX",
    lobKey: "trucking",
    lobName: "Commercial Auto / Trucking",
    channelType: "broker", // 'broker' | 'direct'
    channelName: "Broker Intake: Marsh & McLennan (Email)",
    priority: "P2", // 'P1' | 'P2' | 'P3' | 'P4'
    priorityScore: 78,
    slaText: "24h Standard SLA",
    slaCountdown: "3h 45m remaining",
    priorityReason: "Example record for Premium Visibility demo — same customer as Meridian Logistics Group, quoted separately by David Chen",
    currentPremium: 178500,
    // Prior policy this SAME customer already held with us — used for
    // Old vs New (Renewal) comparison, distinct from cross-submission compare.
    priorPolicy: {
      policyNumber: "POL-2025-TRK-77341",
      policyPeriod: "2025-08-22 to 2026-08-22",
      premium: 162000,
      lossRatio: "28%",
      claimsCount: 1,
      claimsNote: "1 minor cargo claim ($4,200 paid), no fleet safety violations",
      coverageRows: [
        { line: "Commercial Auto Liability (Combined Single Limit)", limit: "$1,750,000 CSL", ded: "$2,500", prem: "$134,500.00" },
        { line: "Auto Physical Damage (Comp & Collision - 10 Units)", limit: "$1,750,000 Stated Value", ded: "$2,500", prem: "$22,300.00" },
        { line: "Motor Truck Cargo Legal Liability", limit: "$200,000 Per Occurrence", ded: "$1,000", prem: "$5,200.00" }
      ]
    },
    missingItems: {
      documents: ["Signed ACORD 137 Application", "Prior 3-Year Loss Run History"],
      dataFields: ["Garaging Address Confirmation"]
    },
    communicationThread: [
      {
        direction: "inbound",
        via: "Broker Email (Marsh & McLennan Commercial Brokerage)",
        from: "Marsh & McLennan Commercial Brokerage",
        to: "Underwriting Team",
        at: "2026-08-22 10:05 AM",
        updateType: null,
        message: "Original submission received via broker intake."
      },
      {
        direction: "outbound",
        via: "Broker Email (Marsh & McLennan Commercial Brokerage)",
        from: "Marsh & McLennan Commercial Brokerage",
        to: "David Chen",
        at: "2026-08-22 03:40 PM",
        updateType: null,
        message: "Thanks for the submission. Before we can finalize a quote we still need: the Signed ACORD 137 Application, Prior 3-Year Loss Run History, and confirmation of the garaging address. Please send these at your earliest convenience."
      }
    ],
    insured: "Meridian Logistics Group",
    fein: "81-3340219",
    dot: "3194022",
    address: "10440 Highway 290 West, Suite 400, Houston, TX 77040",
    broker: "Marsh & McLennan Commercial Brokerage",
    email: "submissions@marshbrokerage.com",
    desk: "Specialty Transportation & Fleet UW Team",
    underwriter: "David Chen (Senior Commercial Underwriter)",
    exposure: "$4,200,000",
    exposureVal: 4200000,
    authorityLimit: 10000000,
    receivedAt: "2026-08-22 10:05 AM",
    receivedTimestamp: 1787433900000,
    statusText: "Quote Generated",
    statusBadge: "badge-primary",
    currentStep: 7,
    completedSteps: [1, 2, 3, 4, 5, 6],
    docs: [
      { name: "ACORD_137_Commercial_Auto_Application.pdf", type: "pdf", desc: "Application Form • 4 Pages • 1.4 MB" },
      { name: "Apex_Freight_Vehicle_SOV_Schedule.xlsx", type: "xls", desc: "Statement of Values (SOV) • 12 Units • 420 KB" },
      { name: "Prior_3_Years_Loss_Runs_Official.pdf", type: "pdf", desc: "Loss Run History • 2 Claims Logged • 2.1 MB" },
      { name: "Driver_MVR_Verification_Report_2026.pdf", type: "pdf", desc: "Official MVR Audit • 100% Active Verified • 850 KB" },
      { name: "FMCSA_Safety_Inspection_Certificate.pdf", type: "pdf", desc: "FMCSA Compliance Audit • Grade A • 1.2 MB" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "DOT / MC Number", val: "USDOT 3194022", conf: "99.8%" },
      { key: "Total Power Units", val: "12 Tractor Units", conf: "99.5%" },
      { key: "Operating Radius", val: "450 Miles (Regional)", conf: "98.9%" },
      { key: "Cargo Type", val: "Dry Van / General Freight", conf: "99.2%" },
      { key: "Garaging Location", val: "Harris County, TX", conf: "99.0%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48901-TX",
      source_channel: "Broker Intake (Email / ACORD)",
      applicant: {
        legal_name: "Apex Freight LLC",
        fein: "81-3340219",
        dot_number: "3194022",
        fleet_size: 12,
        operating_radius_miles: 450,
        garaged_state: "TX"
      },
      loss_history: {
        total_incurred: 14200,
        claims_3yr: 2,
        loss_ratio: "18.4%"
      },
      enrichment: {
        fmcsa_safety_percentile: 94,
        iss_score: "Pass (No Action Required)",
        driver_mvr_clean_rate: "91.6%"
      }
    },
    appetiteRules: [
      { ruleId: "UW-001", category: "Underwriting", factor: "Maximum Fleet Size", operator: "<=", baseValue: 100, unit: "Vehicles", canOverride: true, guardrail: "<= 150", val: "12 Vehicles", pass: true },
      { ruleId: "UW-002", category: "Underwriting", factor: "Maximum Vehicle Age", operator: "<=", baseValue: 15, unit: "Years", canOverride: false, guardrail: "<= 15", val: "6 Years", pass: true },
      { ruleId: "UW-003", category: "Underwriting", factor: "Minimum Driver Experience", operator: ">=", baseValue: 2, unit: "Years", canOverride: true, guardrail: ">= 2", val: "5 Years", pass: true },
      { ruleId: "UW-004", category: "Underwriting", factor: "Maximum 3-Yr Loss Ratio", operator: "<=", baseValue: 60, unit: "%", canOverride: true, guardrail: "<= 60%", val: "18.4%", pass: true },
      { ruleId: "UW-005", category: "Underwriting", factor: "Hazardous Cargo Allowed", operator: "=", baseValue: "Yes", unit: "Yes/No", canOverride: true, guardrail: "Carrier permits; MGA may restrict", val: "No (General Dry Van)", pass: true }
    ],
    enrichmentCards: [
      { title: "FMCSA / DOT Safety Score", icon: "ph-truck", val: "94th Percentile", label: "ISS-D Recommendation: PASS", tag: "badge-success" },
      { title: "DOT Inspection Violations", icon: "ph-warning", val: "0.12 / 100k mi", label: "National Average: 0.48 (Superior)", tag: "badge-success" },
      { title: "Experian Commercial Credit", icon: "ph-chart-pie", val: "88 / 100", label: "Low Financial Default Risk", tag: "badge-info" }
    ],
    subjectivities: [
      "Receipt and satisfactory verification of 100% driver MVRs prior to bind.",
      "Submission of signed Statement of Values with vehicle VIN verification.",
      "Receipt of pre-employment drug and alcohol testing protocol document."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Minor fender damage during backing maneuver", status: "Closed", incurred: "$4,200" },
      { year: "2023 - 2024", desc: "Windshield replacement & minor debris strike", status: "Closed", incurred: "$1,800" },
      { year: "2022 - 2023", desc: "No claims recorded", status: "Clean", incurred: "$0" }
    ],
    insured_id: 748921043,
    submission_id: "SUB-48901-TX",
    quote_id: "QT-TRK-2026-89412",
    endorsement_number: 0,
    broker_fee: { amount: 2574, default: 1 },
    genInfo: {
      quotetype: "Commercial Auto / Trucking",
      application_type_id: 483,
      company: 210,
      lob: "trucking",
      policytype: "New Business",
      billtype: "Agency Bill",
      effective_date: "09/01/2026",
      expiration_date: "09/01/2027",
      lock_rate_effective_date: "08/25/2026",
      business_yrs_exp: "5",
      binding: "pending",
      al_check: true,
      cargo_check: true,
      pd_check: true
    },
    insuredInfo: {
      entity_type: "Corporation / LLC",
      insured_name: "Apex Freight LLC",
      fein: "81-3340219",
      dot_number: "3194022",
      address: "10440 Highway 290 West, Suite 400, Houston, TX 77040",
      insured_garaging_city: "Suite 400",
      insured_garaging_state: "Houston",
      insured_garaging_county: "Suite 400 County",
      years_of_experience: 5,
      dot_yes_no: "Yes",
      icc_filings_yes_no: "No",
      description_of_operation: "Tier-1 Platinum Broker • Clean Appetite Match • Approaching Effective Date"
    },
    coveragesInfo: {
      rating_type: "Composite Rating Engine",
      liability: 1850000,
      al_deductions: 0,
      pd: "Yes",
      cargo: "Yes",
      cargo_limit: 250000,
      pd_high_deductible: "5000",
      pd_deductible_amount: 2500,
      naics_code: 484110,
      rating_class: 5,
      dashcam: "No",
      al_check: true,
      pd_check: true,
      cargo_check: true,
      towing: "10000"
    },
    filingInfo: {
      safer_factor: "1.0",
      FMCSA_alert: "0",
      uw_credit_debit_factor: "0.95"
    },
    radiusOfOperationsInfo: {
      radius: 450,
      Intrastate_interstate: "Interstate"
    },
    serviceInspectionInfo: {
      number_of_inspection_si: 0,
      oos_violation_si: 0,
      account_percent_si: "-",
      account_percent_driver: "-"
    },
    commoditiesSelected: [1, 2],
    commoditiesInfo: { secondary_class: "Commercial Auto / Trucking" },
    uwReviewInfo: {
      driver_factor: 1,
      og_driver_count: 12,
      cr_driver_count: 5,
      al_pollution: "Low",
      al_pollution_factor: "1.00",
      uw_credit_debit_factor: "1.0",
      loss_experience_factor: "1.0",
      min_earn_factor: 25,
      broker_fee_amount: 2574,
      original_driver_exclude_count: 0
    },
    vehicles: [
      {
        id: 903100,
        xid: 1,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$36,200.00",
        liability_premium: "$36,200.00",
        pd_premium: "$36,200.00"
      },
      {
        id: 903101,
        xid: 2,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$10,252.00",
        liability_premium: "$10,252.00",
        pd_premium: "$10,252.00"
      },
      {
        id: 903102,
        xid: 3,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$2,148.00",
        liability_premium: "$2,148.00",
        pd_premium: "$2,148.00"
      }
    ],
    drivers: [
      {
        id: 942561,
        given_name: "Apex",
        last_name: "Freight LLC",
        dob: "01/01/1990",
        licensestate: "Houston",
        licenseclasstype: "Class A",
        experience: "5 Years",
        tenure: 3,
        exclude: 0,
        status: "Active Verified",
        driver_factor: 1
      }
    ],
    quoteNo: "QT-TRK-2026-51177",
    coverageRows: [
      { line: "Commercial Auto Liability (Combined Single Limit)", limit: "$1,850,000 CSL", ded: "$2,500", prem: "$36,200.00" },
      { line: "Auto Physical Damage (Comp & Collision - 12 Units)", limit: "$1,850,000 Stated Value", ded: "$2,500", prem: "$10,252.00" },
      { line: "Motor Truck Cargo Legal Liability", limit: "$250,000 Per Occurrence", ded: "$1,000", prem: "$2,148.00" }
    ]
  },

  {
    id: "SUB-48902-TX",
    lobKey: "trucking",
    lobName: "Commercial Auto / Trucking",
    channelType: "broker", // 'broker' | 'direct'
    channelName: "Broker Intake: Marsh & McLennan (Email)",
    priority: "P3", // 'P1' | 'P2' | 'P3' | 'P4'
    priorityScore: 55,
    slaText: "48h Referral SLA",
    slaCountdown: "3h 45m remaining",
    priorityReason: "Example record for Premium Visibility demo — same customer as Meridian Logistics Group, quoted separately by Marcus Vance",
    currentPremium: 205400,
    insured: "Meridian Logistics Group",
    fein: "81-3340219",
    dot: "3194022",
    address: "10440 Highway 290 West, Suite 400, Houston, TX 77040",
    broker: "Marsh & McLennan Commercial Brokerage",
    email: "submissions@marshbrokerage.com",
    desk: "Specialty Transportation & Fleet UW Team",
    underwriter: "Marcus Vance (Chief Underwriting Officer)",
    exposure: "$4,200,000",
    exposureVal: 4200000,
    authorityLimit: 25000000,
    receivedAt: "2026-08-27 02:40 PM",
    receivedTimestamp: 1787840400000,
    statusText: "Policy Issued",
    statusBadge: "badge-success",
    currentStep: 7,
    completedSteps: [1, 2, 3, 4, 5, 6, 7],
    docs: [
      { name: "ACORD_137_Commercial_Auto_Application.pdf", type: "pdf", desc: "Application Form • 4 Pages • 1.4 MB" },
      { name: "Apex_Freight_Vehicle_SOV_Schedule.xlsx", type: "xls", desc: "Statement of Values (SOV) • 12 Units • 420 KB" },
      { name: "Prior_3_Years_Loss_Runs_Official.pdf", type: "pdf", desc: "Loss Run History • 2 Claims Logged • 2.1 MB" },
      { name: "Driver_MVR_Verification_Report_2026.pdf", type: "pdf", desc: "Official MVR Audit • 100% Active Verified • 850 KB" },
      { name: "FMCSA_Safety_Inspection_Certificate.pdf", type: "pdf", desc: "FMCSA Compliance Audit • Grade A • 1.2 MB" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "DOT / MC Number", val: "USDOT 3194022", conf: "99.8%" },
      { key: "Total Power Units", val: "12 Tractor Units", conf: "99.5%" },
      { key: "Operating Radius", val: "450 Miles (Regional)", conf: "98.9%" },
      { key: "Cargo Type", val: "Dry Van / General Freight", conf: "99.2%" },
      { key: "Garaging Location", val: "Harris County, TX", conf: "99.0%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48902-TX",
      source_channel: "Broker Intake (Email / ACORD)",
      applicant: {
        legal_name: "Apex Freight LLC",
        fein: "81-3340219",
        dot_number: "3194022",
        fleet_size: 12,
        operating_radius_miles: 450,
        garaged_state: "TX"
      },
      loss_history: {
        total_incurred: 14200,
        claims_3yr: 2,
        loss_ratio: "18.4%"
      },
      enrichment: {
        fmcsa_safety_percentile: 94,
        iss_score: "Pass (No Action Required)",
        driver_mvr_clean_rate: "91.6%"
      }
    },
    appetiteRules: [
      { ruleId: "UW-001", category: "Underwriting", factor: "Maximum Fleet Size", operator: "<=", baseValue: 100, unit: "Vehicles", canOverride: true, guardrail: "<= 150", val: "12 Vehicles", pass: true },
      { ruleId: "UW-002", category: "Underwriting", factor: "Maximum Vehicle Age", operator: "<=", baseValue: 15, unit: "Years", canOverride: false, guardrail: "<= 15", val: "6 Years", pass: true },
      { ruleId: "UW-003", category: "Underwriting", factor: "Minimum Driver Experience", operator: ">=", baseValue: 2, unit: "Years", canOverride: true, guardrail: ">= 2", val: "5 Years", pass: true },
      { ruleId: "UW-004", category: "Underwriting", factor: "Maximum 3-Yr Loss Ratio", operator: "<=", baseValue: 60, unit: "%", canOverride: true, guardrail: "<= 60%", val: "18.4%", pass: true },
      { ruleId: "UW-005", category: "Underwriting", factor: "Hazardous Cargo Allowed", operator: "=", baseValue: "Yes", unit: "Yes/No", canOverride: true, guardrail: "Carrier permits; MGA may restrict", val: "No (General Dry Van)", pass: true }
    ],
    enrichmentCards: [
      { title: "FMCSA / DOT Safety Score", icon: "ph-truck", val: "94th Percentile", label: "ISS-D Recommendation: PASS", tag: "badge-success" },
      { title: "DOT Inspection Violations", icon: "ph-warning", val: "0.12 / 100k mi", label: "National Average: 0.48 (Superior)", tag: "badge-success" },
      { title: "Experian Commercial Credit", icon: "ph-chart-pie", val: "88 / 100", label: "Low Financial Default Risk", tag: "badge-info" }
    ],
    subjectivities: [
      "Receipt and satisfactory verification of 100% driver MVRs prior to bind.",
      "Submission of signed Statement of Values with vehicle VIN verification.",
      "Receipt of pre-employment drug and alcohol testing protocol document."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Minor fender damage during backing maneuver", status: "Closed", incurred: "$4,200" },
      { year: "2023 - 2024", desc: "Windshield replacement & minor debris strike", status: "Closed", incurred: "$1,800" },
      { year: "2022 - 2023", desc: "No claims recorded", status: "Clean", incurred: "$0" }
    ],
    insured_id: 748921043,
    submission_id: "SUB-48902-TX",
    quote_id: "QT-TRK-2026-89412",
    endorsement_number: 0,
    broker_fee: { amount: 2574, default: 1 },
    genInfo: {
      quotetype: "Commercial Auto / Trucking",
      application_type_id: 483,
      company: 210,
      lob: "trucking",
      policytype: "New Business",
      billtype: "Agency Bill",
      effective_date: "09/01/2026",
      expiration_date: "09/01/2027",
      lock_rate_effective_date: "08/25/2026",
      business_yrs_exp: "5",
      binding: "pending",
      al_check: true,
      cargo_check: true,
      pd_check: true
    },
    insuredInfo: {
      entity_type: "Corporation / LLC",
      insured_name: "Apex Freight LLC",
      fein: "81-3340219",
      dot_number: "3194022",
      address: "10440 Highway 290 West, Suite 400, Houston, TX 77040",
      insured_garaging_city: "Suite 400",
      insured_garaging_state: "Houston",
      insured_garaging_county: "Suite 400 County",
      years_of_experience: 5,
      dot_yes_no: "Yes",
      icc_filings_yes_no: "No",
      description_of_operation: "Tier-1 Platinum Broker • Clean Appetite Match • Approaching Effective Date"
    },
    coveragesInfo: {
      rating_type: "Composite Rating Engine",
      liability: 1850000,
      al_deductions: 0,
      pd: "Yes",
      cargo: "Yes",
      cargo_limit: 250000,
      pd_high_deductible: "5000",
      pd_deductible_amount: 2500,
      naics_code: 484110,
      rating_class: 5,
      dashcam: "No",
      al_check: true,
      pd_check: true,
      cargo_check: true,
      towing: "10000"
    },
    filingInfo: {
      safer_factor: "1.0",
      FMCSA_alert: "0",
      uw_credit_debit_factor: "0.95"
    },
    radiusOfOperationsInfo: {
      radius: 450,
      Intrastate_interstate: "Interstate"
    },
    serviceInspectionInfo: {
      number_of_inspection_si: 0,
      oos_violation_si: 0,
      account_percent_si: "-",
      account_percent_driver: "-"
    },
    commoditiesSelected: [1, 2],
    commoditiesInfo: { secondary_class: "Commercial Auto / Trucking" },
    uwReviewInfo: {
      driver_factor: 1,
      og_driver_count: 12,
      cr_driver_count: 5,
      al_pollution: "Low",
      al_pollution_factor: "1.00",
      uw_credit_debit_factor: "1.0",
      loss_experience_factor: "1.0",
      min_earn_factor: 25,
      broker_fee_amount: 2574,
      original_driver_exclude_count: 0
    },
    vehicles: [
      {
        id: 903100,
        xid: 1,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$36,200.00",
        liability_premium: "$36,200.00",
        pd_premium: "$36,200.00"
      },
      {
        id: 903101,
        xid: 2,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$10,252.00",
        liability_premium: "$10,252.00",
        pd_premium: "$10,252.00"
      },
      {
        id: 903102,
        xid: 3,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$2,148.00",
        liability_premium: "$2,148.00",
        pd_premium: "$2,148.00"
      }
    ],
    drivers: [
      {
        id: 942561,
        given_name: "Apex",
        last_name: "Freight LLC",
        dob: "01/01/1990",
        licensestate: "Houston",
        licenseclasstype: "Class A",
        experience: "5 Years",
        tenure: 3,
        exclude: 0,
        status: "Active Verified",
        driver_factor: 1
      }
    ],
    quoteNo: "QT-TRK-2026-51290",
    coverageRows: [
      { line: "Commercial Auto Liability (Combined Single Limit)", limit: "$1,850,000 CSL", ded: "$2,500", prem: "$36,200.00" },
      { line: "Auto Physical Damage (Comp & Collision - 12 Units)", limit: "$1,850,000 Stated Value", ded: "$2,500", prem: "$10,252.00" },
      { line: "Motor Truck Cargo Legal Liability", limit: "$250,000 Per Occurrence", ded: "$1,000", prem: "$2,148.00" }
    ]
  },

  {
    id: "SUB-49010-TX",
    lobKey: "trucking",
    lobName: "Commercial Auto / Trucking",
    channelType: "broker", // 'broker' | 'direct'
    channelName: "Broker Intake: Marsh & McLennan (Email)",
    priority: "P1", // 'P1' | 'P2' | 'P3' | 'P4'
    priorityScore: 96,
    slaText: "4h Fast-Track SLA",
    slaCountdown: "3h 45m remaining",
    priorityReason: "Escalation Demo: exposure exceeds Sarah Jenkins' $2M Junior authority — routed for Senior CUO sign-off",
    // Unified Account View demo: parent account grouping across LOBs.
    insured: "Titan Logistics Partners",
    fein: "82-5510934",
    dot: "3194022",
    address: "10440 Highway 290 West, Suite 400, Houston, TX 77040",
    broker: "Marsh & McLennan Commercial Brokerage",
    email: "submissions@marshbrokerage.com",
    desk: "Specialty Transportation & Fleet UW Team",
    underwriter: "Sarah Jenkins (Junior Underwriter)",
    exposure: "$3,200,000",
    exposureVal: 3200000,
    authorityLimit: 2000000,
    receivedAt: "2026-08-30 09:30 AM",
    receivedTimestamp: 1788082200000,
    statusText: "Authority Review",
    statusBadge: "badge-primary",
    currentStep: 5,
    completedSteps: [1, 2, 3, 4],
    docs: [
      { name: "ACORD_137_Commercial_Auto_Application.pdf", type: "pdf", desc: "Application Form • 4 Pages • 1.4 MB" },
      { name: "Apex_Freight_Vehicle_SOV_Schedule.xlsx", type: "xls", desc: "Statement of Values (SOV) • 12 Units • 420 KB" },
      { name: "Prior_3_Years_Loss_Runs_Official.pdf", type: "pdf", desc: "Loss Run History • 2 Claims Logged • 2.1 MB" },
      { name: "Driver_MVR_Verification_Report_2026.pdf", type: "pdf", desc: "Official MVR Audit • 100% Active Verified • 850 KB" },
      { name: "FMCSA_Safety_Inspection_Certificate.pdf", type: "pdf", desc: "FMCSA Compliance Audit • Grade A • 1.2 MB" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "DOT / MC Number", val: "USDOT 3194022", conf: "99.8%" },
      { key: "Total Power Units", val: "12 Tractor Units", conf: "99.5%" },
      { key: "Operating Radius", val: "450 Miles (Regional)", conf: "98.9%" },
      { key: "Cargo Type", val: "Dry Van / General Freight", conf: "99.2%" },
      { key: "Garaging Location", val: "Harris County, TX", conf: "99.0%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-49010-TX",
      source_channel: "Broker Intake (Email / ACORD)",
      applicant: {
        legal_name: "Apex Freight LLC",
        fein: "82-5510934",
        dot_number: "3194022",
        fleet_size: 12,
        operating_radius_miles: 450,
        garaged_state: "TX"
      },
      loss_history: {
        total_incurred: 14200,
        claims_3yr: 2,
        loss_ratio: "18.4%"
      },
      enrichment: {
        fmcsa_safety_percentile: 94,
        iss_score: "Pass (No Action Required)",
        driver_mvr_clean_rate: "91.6%"
      }
    },
    appetiteRules: [
      { ruleId: "UW-001", category: "Underwriting", factor: "Maximum Fleet Size", operator: "<=", baseValue: 100, unit: "Vehicles", canOverride: true, guardrail: "<= 150", val: "12 Vehicles", pass: true },
      { ruleId: "UW-002", category: "Underwriting", factor: "Maximum Vehicle Age", operator: "<=", baseValue: 15, unit: "Years", canOverride: false, guardrail: "<= 15", val: "6 Years", pass: true },
      { ruleId: "UW-003", category: "Underwriting", factor: "Minimum Driver Experience", operator: ">=", baseValue: 2, unit: "Years", canOverride: true, guardrail: ">= 2", val: "5 Years", pass: true },
      { ruleId: "UW-004", category: "Underwriting", factor: "Maximum 3-Yr Loss Ratio", operator: "<=", baseValue: 60, unit: "%", canOverride: true, guardrail: "<= 60%", val: "18.4%", pass: true },
      { ruleId: "UW-005", category: "Underwriting", factor: "Hazardous Cargo Allowed", operator: "=", baseValue: "Yes", unit: "Yes/No", canOverride: true, guardrail: "Carrier permits; MGA may restrict", val: "No (General Dry Van)", pass: true }
    ],
    enrichmentCards: [
      { title: "FMCSA / DOT Safety Score", icon: "ph-truck", val: "94th Percentile", label: "ISS-D Recommendation: PASS", tag: "badge-success" },
      { title: "DOT Inspection Violations", icon: "ph-warning", val: "0.12 / 100k mi", label: "National Average: 0.48 (Superior)", tag: "badge-success" },
      { title: "Experian Commercial Credit", icon: "ph-chart-pie", val: "88 / 100", label: "Low Financial Default Risk", tag: "badge-info" }
    ],
    subjectivities: [
      "Receipt and satisfactory verification of 100% driver MVRs prior to bind.",
      "Submission of signed Statement of Values with vehicle VIN verification.",
      "Receipt of pre-employment drug and alcohol testing protocol document."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Minor fender damage during backing maneuver", status: "Closed", incurred: "$4,200" },
      { year: "2023 - 2024", desc: "Windshield replacement & minor debris strike", status: "Closed", incurred: "$1,800" },
      { year: "2022 - 2023", desc: "No claims recorded", status: "Clean", incurred: "$0" }
    ],
    insured_id: 748921043,
    submission_id: "SUB-49010-TX",
    quote_id: "QT-TRK-2026-89412",
    endorsement_number: 0,
    broker_fee: { amount: 2574, default: 1 },
    genInfo: {
      quotetype: "Commercial Auto / Trucking",
      application_type_id: 483,
      company: 210,
      lob: "trucking",
      policytype: "New Business",
      billtype: "Agency Bill",
      effective_date: "09/01/2026",
      expiration_date: "09/01/2027",
      lock_rate_effective_date: "08/25/2026",
      business_yrs_exp: "5",
      binding: "pending",
      al_check: true,
      cargo_check: true,
      pd_check: true
    },
    insuredInfo: {
      entity_type: "Corporation / LLC",
      insured_name: "Apex Freight LLC",
      fein: "82-5510934",
      dot_number: "3194022",
      address: "10440 Highway 290 West, Suite 400, Houston, TX 77040",
      insured_garaging_city: "Suite 400",
      insured_garaging_state: "Houston",
      insured_garaging_county: "Suite 400 County",
      years_of_experience: 5,
      dot_yes_no: "Yes",
      icc_filings_yes_no: "No",
      description_of_operation: "Tier-1 Platinum Broker • Clean Appetite Match • Approaching Effective Date"
    },
    coveragesInfo: {
      rating_type: "Composite Rating Engine",
      liability: 1850000,
      al_deductions: 0,
      pd: "Yes",
      cargo: "Yes",
      cargo_limit: 250000,
      pd_high_deductible: "5000",
      pd_deductible_amount: 2500,
      naics_code: 484110,
      rating_class: 5,
      dashcam: "No",
      al_check: true,
      pd_check: true,
      cargo_check: true,
      towing: "10000"
    },
    filingInfo: {
      safer_factor: "1.0",
      FMCSA_alert: "0",
      uw_credit_debit_factor: "0.95"
    },
    radiusOfOperationsInfo: {
      radius: 450,
      Intrastate_interstate: "Interstate"
    },
    serviceInspectionInfo: {
      number_of_inspection_si: 0,
      oos_violation_si: 0,
      account_percent_si: "-",
      account_percent_driver: "-"
    },
    commoditiesSelected: [1, 2],
    commoditiesInfo: { secondary_class: "Commercial Auto / Trucking" },
    uwReviewInfo: {
      driver_factor: 1,
      og_driver_count: 12,
      cr_driver_count: 5,
      al_pollution: "Low",
      al_pollution_factor: "1.00",
      uw_credit_debit_factor: "1.0",
      loss_experience_factor: "1.0",
      min_earn_factor: 25,
      broker_fee_amount: 2574,
      original_driver_exclude_count: 0
    },
    vehicles: [
      {
        id: 903100,
        xid: 1,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$36,200.00",
        liability_premium: "$36,200.00",
        pd_premium: "$36,200.00"
      },
      {
        id: 903101,
        xid: 2,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$10,252.00",
        liability_premium: "$10,252.00",
        pd_premium: "$10,252.00"
      },
      {
        id: 903102,
        xid: 3,
        year: 2024,
        make: "Apex",
        model: "Commercial Vehicle",
        state_code: "Houston",
        weight: "Commercial",
        ownership: "Owned",
        primary_code: 332,
        rating_class: 5,
        stated_value: 1850000,
        al_value: 370000,
        miles_driven: 450,
        no_of_units: 1,
        vehicle_age: 2,
        Liability: "Yes",
        pd_opted: "Yes",
        naics_code: 484110,
        liab_baserate: 837,
        liab_ilf_factor: 2.06,
        liab_lcm_factor: 1.67,
        liab_primary_factor: 1.8,
        liab_secondary_factor: 1.98,
        liab_fleet_factor: 0.97,
        vehicle_age_factor: 1.12,
        liab_ocn_factor: 1.14,
        radius_factor: 0.95,
        naics_factor: 1.1,
        vehicle_owned_factor: 0.95,
        al_premium_wo_mod_factor: "$2,148.00",
        liability_premium: "$2,148.00",
        pd_premium: "$2,148.00"
      }
    ],
    drivers: [
      {
        id: 942561,
        given_name: "Apex",
        last_name: "Freight LLC",
        dob: "01/01/1990",
        licensestate: "Houston",
        licenseclasstype: "Class A",
        experience: "5 Years",
        tenure: 3,
        exclude: 0,
        status: "Active Verified",
        driver_factor: 1
      }
    ],
    quoteNo: "QT-TRK-2026-91055",
    coverageRows: [
      { line: "Commercial Auto Liability (Combined Single Limit)", limit: "$1,850,000 CSL", ded: "$2,500", prem: "$36,200.00" },
      { line: "Auto Physical Damage (Comp & Collision - 12 Units)", limit: "$1,850,000 Stated Value", ded: "$2,500", prem: "$10,252.00" },
      { line: "Motor Truck Cargo Legal Liability", limit: "$250,000 Per Occurrence", ded: "$1,000", prem: "$2,148.00" }
    ]
  },

  {
    id: "SUB-48450-IL",
    lobKey: "trucking",
    lobName: "Commercial Auto / Trucking",
    channelType: "direct",
    channelName: "Direct Customer Portal (Self-Service Form)",
    priority: "P2",
    priorityScore: 84,
    slaText: "24h Standard SLA",
    slaCountdown: "18h 10m remaining",
    priorityReason: "Direct Ingestion • Standard Verification Required",
    insured: "Prairie State Express Freight",
    fein: "36-8842109",
    dot: "3491028",
    address: "2200 Interstate Blvd, Chicago, IL 60607",
    broker: "Direct Customer (Online Intake)",
    email: "operations@prairiestatefreight.com",
    desk: "Specialty Transportation & Fleet UW Team",
    underwriter: "Sarah Jenkins (Senior Fleet UW)",
    exposure: "$1,200,000",
    exposureVal: 1200000,
    authorityLimit: 2000000,
    receivedAt: "2026-08-25 02:40 PM",
    receivedTimestamp: 1787678400000,
    statusText: "Intake Ingested",
    statusBadge: "badge-primary",
    // Monthly pipeline chart demo: blocked before quote generation due to
    // missing information from the customer.
    missingItems: {
      documents: ["Signed ACORD 137 Application", "DOT Safety Rating Letter"],
      dataFields: []
    },
    currentStep: 1,
    completedSteps: [],
    docs: [
      { name: "ACORD_137_Prairie_Auto.pdf", type: "pdf", desc: "Customer Self-Service Form • 3 Pages" },
      { name: "Fleet_Units_SOV_Prairie.xlsx", type: "xls", desc: "8 Power Units Schedule • 290 KB" },
      { name: "Prior_3_Years_Loss_History.pdf", type: "pdf", desc: "Loss Runs • 1 Claim Logged" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "DOT / MC Number", val: "USDOT 3491028", conf: "99.9%" },
      { key: "Total Power Units", val: "8 Tractor Units", conf: "99.3%" },
      { key: "Operating Radius", val: "300 Miles (Regional Midwest)", conf: "98.7%" },
      { key: "Cargo Type", val: "Refrigerated Food Goods", conf: "99.1%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48450-IL",
      source_channel: "Direct Customer Online Portal",
      applicant: {
        legal_name: "Prairie State Express Freight",
        fein: "36-8842109",
        dot_number: "3491028",
        fleet_size: 8,
        operating_radius_miles: 300
      }
    },
    appetiteRules: [
      { ruleId: "UW-001", category: "Underwriting", factor: "Maximum Fleet Size", operator: "<=", baseValue: 100, unit: "Vehicles", canOverride: true, guardrail: "<= 150", val: "8 Vehicles", pass: true },
      { ruleId: "UW-002", category: "Underwriting", factor: "Maximum Vehicle Age", operator: "<=", baseValue: 15, unit: "Years", canOverride: false, guardrail: "<= 15", val: "4 Years", pass: true },
      { ruleId: "UW-003", category: "Underwriting", factor: "Minimum Driver Experience", operator: ">=", baseValue: 2, unit: "Years", canOverride: true, guardrail: ">= 2", val: "6 Years", pass: true },
      { ruleId: "UW-004", category: "Underwriting", factor: "Maximum 3-Yr Loss Ratio", operator: "<=", baseValue: 60, unit: "%", canOverride: true, guardrail: "<= 60%", val: "12.0%", pass: true },
      { ruleId: "UW-005", category: "Underwriting", factor: "Hazardous Cargo Allowed", operator: "=", baseValue: "Yes", unit: "Yes/No", canOverride: true, guardrail: "Carrier permits; MGA may restrict", val: "No (Refrigerated Goods)", pass: true }
    ],
    enrichmentCards: [
      { title: "FMCSA / DOT Safety Score", icon: "ph-truck", val: "91st Percentile", label: "ISS-D Recommendation: PASS", tag: "badge-success" },
      { title: "DOT Inspection Violations", icon: "ph-warning", val: "0.18 / 100k mi", label: "Clean Safety Record", tag: "badge-success" },
      { title: "Experian Commercial Credit", icon: "ph-chart-pie", val: "82 / 100", label: "Good Standing", tag: "badge-info" }
    ],
    subjectivities: [
      "Receipt of driver list with verified MVRs.",
      "Signed electronic Statement of Values."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Tire blowout & minor rim damage", status: "Closed", incurred: "$2,200" },
      { year: "2023 - 2024", desc: "Clean loss record", status: "Clean", incurred: "$0" }
    ],
    quoteNo: "QT-TRK-2026-44019",
    coverageRows: [
      { line: "Commercial Auto Liability (Combined Single Limit)", limit: "$1,000,000 CSL", ded: "$2,500", prem: "$28,400.00" },
      { line: "Auto Physical Damage (8 Units)", limit: "$850,000 Stated Value", ded: "$2,500", prem: "$8,200.00" }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. COMMERCIAL PROPERTY
  // --------------------------------------------------------------------------
  {
    id: "SUB-48290-PX",
    lobKey: "property",
    lobName: "Commercial Property",
    channelType: "broker",
    channelName: "Broker Intake: Aon Risk (Portal Upload)",
    priority: "P1",
    priorityScore: 94,
    slaText: "4h Fast-Track SLA",
    slaCountdown: "2h 30m remaining",
    priorityReason: "Tier-1 Aon Producer • $14.2M High TIV • Complete ESFR Schedule",
    // Unified Account View demo: warehousing subsidiary under the same
    // parent account as the Apex Freight trucking line.
    accountName: "Apex Freight Holdings",
    insured: "Summit Warehousing & Logistics",
    fein: "81-440000PX",
    dot: "N/A (Fixed Facility)",
    address: "8800 Logistics Parkway, Dallas, TX 75261",
    broker: "Aon Commercial Risk Solutions",
    email: "property@aonrisk.com",
    desk: "Commercial Property & Real Estate Desk",
    underwriter: "David Chen (Property Senior UW)",
    exposure: "$14,200,000",
    exposureVal: 14200000,
    authorityLimit: 15000000,
    receivedAt: "2026-08-25 10:30 AM",
    receivedTimestamp: 1787663400000,
    statusText: "UW Review",
    statusBadge: "badge-info",
    currentStep: 4,
    completedSteps: [1, 2, 3],
    docs: [
      { name: "ACORD_140_Commercial_Property_Application.pdf", type: "pdf", desc: "Property Application • 6 Pages • 2.2 MB" },
      { name: "Summit_Warehouse_Building_SOV_Schedule.xlsx", type: "xls", desc: "Building & BPP Statement of Values • 380 KB" },
      { name: "Prior_3_Years_Property_Loss_Runs.pdf", type: "pdf", desc: "Carrier Verified Loss Runs • $9,600 Incurred" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Total Insured Value (TIV)", val: "$14,200,000", conf: "99.9%" },
      { key: "Construction Class", val: "ISO Class 4 (Masonry Non-Combustible)", conf: "99.1%" },
      { key: "Square Footage", val: "185,000 Sq. Ft.", conf: "98.7%" },
      { key: "Fire Protection", val: "100% ESFR Wet Sprinklered", conf: "99.5%" },
      { key: "Roof Year / Type", val: "2021 TPO Membrane", conf: "97.8%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48290-PX",
      source_channel: "Broker Portal (Aon)",
      applicant: {
        legal_name: "Summit Warehousing & Logistics",
        fein: "81-440000PX",
        tiv_total: 14200000,
        building_value: 9800000,
        contents_bpp: 4400000,
        occupancy: "Dry Warehousing / Palletized Storage"
      },
      cope: {
        construction: "Masonry Non-Combustible",
        protection_class: "ISO Class 3 (Hydrant 250ft)",
        exposure: "Minimal (Isolated Industrial Park)"
      }
    },
    appetiteRules: [
      { ruleId: "PROP-001", category: "Property Eligibility", factor: "Maximum Single Location TIV", operator: "<=", baseValue: 25000000, unit: "$", canOverride: true, guardrail: "<= $25.0M", val: "$14.2M", pass: true },
      { ruleId: "PROP-002", category: "Property Eligibility", factor: "Minimum Sprinkler Protection Coverage", operator: ">=", baseValue: 85, unit: "%", canOverride: true, guardrail: ">= 85% for Warehouse", val: "100% ESFR", pass: true },
      { ruleId: "PROP-003", category: "Property Eligibility", factor: "High Hazard Flood / Surge Zone", operator: "=", baseValue: "No High Hazard A/V", unit: "Zone", canOverride: false, guardrail: "No High Hazard A/V Zone", val: "Zone X (Minimal)", pass: true },
      { ruleId: "PROP-004", category: "Property Eligibility", factor: "Maximum Wildfire Hazard Index", operator: "<=", baseValue: 45, unit: "Score", canOverride: true, guardrail: "<= 45", val: "Score 12 (Very Low)", pass: true }
    ],
    enrichmentCards: [
      { title: "HazardHub Property Risk", icon: "ph-fire", val: "Grade A (Low Risk)", label: "PPC Class 3 • Fire Station 1.2 mi", tag: "badge-success" },
      { title: "Catastrophe / Flood Model", icon: "ph-cloud-rain", val: "Zone X (100-Yr Safe)", label: "Distance to Coast: 240 Miles", tag: "badge-info" },
      { title: "Dun & Bradstreet Paydex", icon: "ph-bank", val: "84 / 100", label: "Punctual Premium & Payment Record", tag: "badge-success" }
    ],
    subjectivities: [
      "Satisfactory visual roof inspection report verifying 2021 installation.",
      "Confirmation of central station alarm monitoring certificate.",
      "Annual testing certification of ESFR sprinkler system pumps."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Water pipe freeze during January cold snap (Repaired)", status: "Closed", incurred: "$7,500" },
      { year: "2023 - 2024", desc: "No losses recorded", status: "Clean", incurred: "$0" },
      { year: "2022 - 2023", desc: "Small outdoor pallet burn - No structural impact", status: "Closed", incurred: "$2,100" }
    ],
    quoteNo: "QT-PRP-2026-51209",
    coverageRows: [
      { line: "Building Real Property Coverage (Special Form / RC)", limit: "$9,800,000", ded: "$10,000", prem: "$20,500.00" },
      { line: "Business Personal Property (Contents / Inventory)", limit: "$4,400,000", ded: "$10,000", prem: "$8,900.00" },
      { line: "Business Income with Extra Expense (12 Months ALS)", limit: "$1,500,000", ded: "72 Hours", prem: "$3,000.00" }
    ]
  },

  {
    id: "SUB-48501-PX",
    lobKey: "property",
    lobName: "Commercial Property",
    channelType: "direct",
    channelName: "Direct Customer Portal (Self-Service Online)",
    priority: "P3",
    priorityScore: 72,
    slaText: "48h Standard FIFO",
    slaCountdown: "34h 15m remaining",
    priorityReason: "Direct Portal Intake • Standard FIFO Processing Order",
    // Unified Account View demo: second example account, spanning exactly
    // two lines of business (Property + GL CPC).
    accountName: "Sunstate Industrial Group",
    insured: "Sunstate Cold Storage & Distribution",
    fein: "59-3391024",
    dot: "N/A (Property)",
    address: "500 Port Blvd, Tampa, FL 33605",
    broker: "Direct Customer Portal",
    email: "insurance@sunstatecold.com",
    desk: "Commercial Property & Real Estate Desk",
    underwriter: "David Chen (Property Senior UW)",
    exposure: "$9,500,000",
    exposureVal: 9500000,
    authorityLimit: 15000000,
    receivedAt: "2026-08-25 03:10 PM",
    receivedTimestamp: 1787680200000,
    statusText: "Ingestion Pipeline",
    statusBadge: "badge-primary",
    currentStep: 1,
    completedSteps: [],
    docs: [
      { name: "Sunstate_SelfService_App.pdf", type: "pdf", desc: "Customer Property Portal Form • 4 Pages" },
      { name: "Cold_Storage_Equipment_SOV.xlsx", type: "xls", desc: "Freezer & Building SOV • 310 KB" },
      { name: "Prior_Loss_Runs_5Yr.pdf", type: "pdf", desc: "Prior 5-Year Loss History • $5,000 Incurred" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Total Insured Value (TIV)", val: "$9,500,000", conf: "99.8%" },
      { key: "Occupancy", val: "Cold Storage / Ammonia Refrigeration", conf: "99.2%" },
      { key: "Sprinkler Protection", val: "Wet Pipe with Anti-Freeze Loops", conf: "98.9%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48501-PX",
      source_channel: "Direct Customer Portal",
      applicant: {
        legal_name: "Sunstate Cold Storage & Distribution",
        fein: "59-3391024",
        tiv_total: 9500000
      }
    },
    appetiteRules: [
      { ruleId: "PROP-001", category: "Property Eligibility", factor: "Maximum Single Location TIV", operator: "<=", baseValue: 25000000, unit: "$", canOverride: true, guardrail: "<= $25.0M", val: "$9.5M", pass: true },
      { ruleId: "PROP-005", category: "Property Eligibility", factor: "Windstorm Tier 1 County Exclusion", operator: "=", baseValue: "Meets Tier 2 distance", unit: "Zone", canOverride: false, guardrail: "Meets Tier 2 distance", val: "Inland Tampa", pass: true },
      { ruleId: "PROP-006", category: "Property Eligibility", factor: "Ammonia Refrigeration Safety System", operator: "=", baseValue: "Mandatory Auto Shutoff", unit: "System", canOverride: false, guardrail: "Mandatory Auto Shutoff", val: "Sensors Active", pass: true }
    ],
    enrichmentCards: [
      { title: "HazardHub Property Risk", icon: "ph-fire", val: "Grade B (Moderate)", label: "ISO PPC Class 4", tag: "badge-info" },
      { title: "Wind / Hurricane Score", icon: "ph-wind", val: "Cat 2 Rating", label: "Hurricane Straps in Place", tag: "badge-warning" },
      { title: "D&B Credit Rating", icon: "ph-bank", val: "79 / 100", label: "Good Financial Health", tag: "badge-success" }
    ],
    subjectivities: [
      "Inspection of ammonia refrigeration pressure relief valves within 30 days.",
      "Windstorm mitigation questionnaire completed and signed."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Minor roof flashing leak during heavy rain", status: "Closed", incurred: "$5,000" }
    ],
    quoteNo: "QT-PRP-2026-61028",
    coverageRows: [
      { line: "Building & Refrigeration Structure", limit: "$6,500,000", ded: "$10,000", prem: "$16,500.00" },
      { line: "Business Personal Property / Perishable Inventory", limit: "$3,000,000", ded: "$10,000", prem: "$7,200.00" }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. MPL - MANAGEMENT & PROFESSIONAL LIABILITY
  // --------------------------------------------------------------------------
  {
    id: "SUB-48301-NY",
    lobKey: "mpl",
    lobName: "MPL - Professional Liability",
    channelType: "direct",
    channelName: "Direct Customer Portal (Online Self-Service)",
    priority: "P1",
    priorityScore: 92,
    slaText: "4h Fast-Track SLA",
    slaCountdown: "1h 50m remaining",
    priorityReason: "Clean Loss Free History (0 Claims / 5 Yrs) • Fast-Track Digital Bind",
    insured: "Vanguard Advisory Partners LLC",
    fein: "22-9901452",
    dot: "N/A (Financial Services)",
    address: "200 Park Avenue, 35th Floor, New York, NY 10166",
    broker: "Direct Customer (No Intermediary)",
    email: "legal@vanguardpartners.com",
    desk: "Financial & Professional Executive Lines Desk",
    underwriter: "Elena Rostova (MPL Practice Lead)",
    exposure: "$8,500,000",
    exposureVal: 8500000,
    authorityLimit: 10000000,
    receivedAt: "2026-08-25 11:45 AM",
    receivedTimestamp: 1787667900000,
    statusText: "Ready for Quote",
    statusBadge: "badge-success",
    currentStep: 7,
    completedSteps: [1, 2, 3, 4, 5, 6],
    docs: [
      { name: "MPL_Application_Financial_Consulting.pdf", type: "pdf", desc: "Self-Service Digital Application • 1.1 MB" },
      { name: "Vanguard_Client_Fee_Schedule.xlsx", type: "xls", desc: "Annual Revenue by Practice Area • 210 KB" },
      { name: "5_Year_EandO_Loss_Runs_Carrier_Signed.pdf", type: "pdf", desc: "Zero Claims Verification Letter • 850 KB" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Annual Gross Revenue", val: "$8,500,000", conf: "99.8%" },
      { key: "Practice Area", val: "Corporate Strategy & M&A Advisory", conf: "99.4%" },
      { key: "Number of Consultants", val: "28 Full-Time Professionals", conf: "98.9%" },
      { key: "Standard Client Contract", val: "100% Written Engagement Letters", conf: "99.1%" },
      { key: "Retroactive Date", val: "09/01/2018 (Full Prior Acts)", conf: "99.0%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48301-NY",
      source_channel: "Direct Customer Intake Portal",
      applicant: {
        legal_name: "Vanguard Advisory Partners LLC",
        fein: "22-9901452",
        annual_revenue: 8500000,
        professional_staff_count: 28,
        services: "Management Consulting / Mergers & Acquisitions"
      },
      underwriting: {
        risk_management: "Mandatory Limitation of Liability Clauses in 100% contracts",
        loss_history_5yr: 0
      }
    },
    appetiteRules: [
      { ruleId: "MPL-001", category: "Professional Liability Eligibility", factor: "Prohibited Practice Classes", operator: "=", baseValue: "Excluded high-risk financial", unit: "Class", canOverride: false, guardrail: "Excludes Securities / Crypto", val: "Strategy / M&A", pass: true },
      { ruleId: "MPL-002", category: "Professional Liability Eligibility", factor: "Minimum Years in Business", operator: ">=", baseValue: 3, unit: "Years", canOverride: true, guardrail: ">= 3", val: "8 Years", pass: true },
      { ruleId: "MPL-003", category: "Professional Liability Eligibility", factor: "Standard Limitation of Liability Clause", operator: "=", baseValue: "Required", unit: "Clause", canOverride: true, guardrail: "Required in all master agreements", val: "Present in 100%", pass: true },
      { ruleId: "MPL-004", category: "Professional Liability Eligibility", factor: "Maximum Prior Claims (5-Yr)", operator: "<=", baseValue: 2, unit: "Claims", canOverride: true, guardrail: "<= 2", val: "0 Claims", pass: true }
    ],
    enrichmentCards: [
      { title: "State Bar & Licensing Board", icon: "ph-certificate", val: "100% Active / Clean", label: "No Regulatory Inquiries Found", tag: "badge-success" },
      { title: "Financial Stability Score", icon: "ph-chart-line", val: "Tier 1 (Prime)", label: "Revenue CAGR +14% YoY", tag: "badge-info" },
      { title: "Adverse Media / Litigation", icon: "ph-newspaper", val: "Zero Matches", label: "Checked 450+ Legal Databases", tag: "badge-success" }
    ],
    subjectivities: [
      "Signed Warranty and Representation Letter by Managing Partner.",
      "Sample standard client master service agreement with limitation of liability clause.",
      "Confirmation of no knowledge of potential errors or omissions."
    ],
    losses: [
      { year: "2024 - 2025", desc: "No claims / incidents reported", status: "Clean", incurred: "$0" },
      { year: "2023 - 2024", desc: "No claims / incidents reported", status: "Clean", incurred: "$0" },
      { year: "2022 - 2023", desc: "No claims / incidents reported", status: "Clean", incurred: "$0" }
    ],
    quoteNo: "QT-MPL-2026-10492",
    coverageRows: [
      { line: "Errors & Omissions (E&O) Professional Liability", limit: "$3,000,000 Each Claim / $5,000,000 Aggregate", ded: "$25,000", prem: "$14,500.00" },
      { line: "Directors & Officers (D&O) Management Liability", limit: "$2,000,000 Limit", ded: "$15,000", prem: "$3,700.00" }
    ]
  },

  {
    id: "SUB-48302-MA",
    lobKey: "mpl",
    lobName: "MPL - Professional Liability",
    channelType: "broker",
    channelName: "Broker Intake: Willis Towers Watson (WTW)",
    priority: "P2",
    priorityScore: 82,
    slaText: "24h Standard SLA",
    slaCountdown: "14h 20m remaining",
    priorityReason: "Tier-1 WTW Broker • $12M Exposure • Audit In Progress",
    // Archival Policy demo: retired 150 days ago — eligible for archival
    // under the default policy (retired + 90 day retention).
    lifecycleStatus: "retired",
    lifecycleStatusAt: Date.now() - (150 * 24 * 60 * 60 * 1000),
    insured: "Beacon Financial & Legal Advisory Group",
    fein: "04-8831920",
    dot: "N/A (Professional Lines)",
    address: "100 High Street, 22nd Floor, Boston, MA 02110",
    broker: "Willis Towers Watson Commercial",
    email: "finpro@wtwco.com",
    desk: "Financial & Professional Executive Lines Desk",
    underwriter: "Elena Rostova (MPL Practice Lead)",
    exposure: "$12,000,000",
    exposureVal: 12000000,
    authorityLimit: 15000000,
    receivedAt: "2026-08-25 01:10 PM",
    receivedTimestamp: 1787673000000,
    statusText: "UW Review",
    statusBadge: "badge-primary",
    currentStep: 4,
    completedSteps: [1, 2, 3],
    docs: [
      { name: "WTW_Executive_MPL_Submission.pdf", type: "pdf", desc: "Executive Package Application • 8 Pages" },
      { name: "Beacon_Fee_Revenue_Audit.xlsx", type: "xls", desc: "Audited Financials • 340 KB" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Annual Gross Fee Revenue", val: "$12,000,000", conf: "99.8%" },
      { key: "Practice Specialization", val: "Corporate Tax & Executive Retained Advisory", conf: "99.2%" },
      { key: "Partner Count", val: "18 Senior Partners", conf: "98.9%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48302-MA",
      source_channel: "Broker Ingestion (WTW)",
      applicant: {
        legal_name: "Beacon Financial & Legal Advisory Group",
        fein: "04-8831920",
        annual_revenue: 12000000
      }
    },
    appetiteRules: [
      { ruleId: "MPL-002", category: "Professional Liability Eligibility", factor: "Minimum Years in Business", operator: ">=", baseValue: 3, unit: "Years", canOverride: true, guardrail: ">= 3", val: "12 Years", pass: true },
      { ruleId: "MPL-003", category: "Professional Liability Eligibility", factor: "Mandatory Limitation of Liability Clause", operator: "=", baseValue: "Required", unit: "Clause", canOverride: true, guardrail: "Required in all client MSAs", val: "Present in 100%", pass: true }
    ],
    enrichmentCards: [
      { title: "Massachusetts Board of Bar Overseers", icon: "ph-certificate", val: "100% Clean", label: "Zero Disciplinary Actions", tag: "badge-success" },
      { title: "Financial Solvency Rating", icon: "ph-chart-line", val: "Tier 1 (AAA)", label: "Top-Quartile Balance Sheet", tag: "badge-success" },
      { title: "Litigation & PACER Search", icon: "ph-newspaper", val: "Clean Record", label: "Zero Open Federal Suits", tag: "badge-info" }
    ],
    subjectivities: [
      "Signed statement of no known losses or potential claims.",
      "Copy of standard master services agreement."
    ],
    losses: [
      { year: "2024 - 2025", desc: "No claims recorded", status: "Clean", incurred: "$0" }
    ],
    quoteNo: "QT-MPL-2026-88129",
    coverageRows: [
      { line: "E&O Professional Liability", limit: "$5,000,000 Aggregate", ded: "$50,000", prem: "$24,000.00" }
    ]
  },

  // --------------------------------------------------------------------------
  // 4. GL CPC - COMMERCIAL PACKAGE & CONTRACTORS
  // --------------------------------------------------------------------------
  {
    id: "SUB-48315-OH",
    lobKey: "gl_cpc",
    lobName: "GL CPC - Commercial Package & Contractors",
    channelType: "broker",
    channelName: "Broker Intake: Gallagher (Broker API)",
    priority: "P1",
    priorityScore: 91,
    slaText: "4h Fast-Track SLA",
    slaCountdown: "2h 15m remaining",
    priorityReason: "Direct API Ingestion • Zero OSHA Violations • Complete Subcontractor SOV",
    // Unified Account View demo: contracting/yard-operations subsidiary
    // under the same parent account as Apex Freight Holdings.
    accountName: "Apex Freight Holdings",
    insured: "BuildCraft Commercial Contracting Inc.",
    fein: "81-440000OH",
    dot: "N/A (Contracting)",
    address: "410 Industrial Way, Columbus, OH 43215",
    broker: "Gallagher Commercial Brokers",
    email: "commercial@ajg.com",
    desk: "Construction & Commercial Package Team",
    underwriter: "Michael Rossi (Casualty Specialist)",
    exposure: "$4,200,000",
    exposureVal: 4200000,
    authorityLimit: 5000000,
    receivedAt: "2026-08-25 12:15 PM",
    receivedTimestamp: 1787669700000,
    statusText: "Clearance Cleared",
    statusBadge: "badge-primary",
    currentStep: 3,
    completedSteps: [1, 2],
    docs: [
      { name: "ACORD_125_Commercial_Package_Application.pdf", type: "pdf", desc: "Package Application • 5 Pages • 1.8 MB" },
      { name: "BuildCraft_Contractor_Payroll_Schedule.xlsx", type: "xls", desc: "Direct Payroll & Subcontractor breakdown" },
      { name: "BuildCraft_3_Year_GL_Loss_Runs.pdf", type: "pdf", desc: "Loss Runs • 2 Minor Closed Claims" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Annual Direct Payroll", val: "$4,200,000", conf: "99.7%" },
      { key: "Subcontracted Cost", val: "$1,800,000", conf: "98.9%" },
      { key: "Contractor Class", val: "Commercial Interior Buildout & Fit-out", conf: "99.1%" },
      { key: "Subcontractor Risk Transfer", val: "Mandatory Hold Harmless & AI", conf: "99.3%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48315-OH",
      source_channel: "Broker API (Gallagher)",
      applicant: {
        legal_name: "BuildCraft Commercial Contracting Inc.",
        fein: "81-440000OH",
        direct_payroll: 4200000,
        subcontractor_cost: 1800000,
        class_code: "91580 - Commercial Carpentry / Interiors"
      },
      compliance: {
        written_subcontract_agreement: "Enforced 100%",
        minimum_sub_limit_required: "$1,000,000 CSL"
      }
    },
    appetiteRules: [
      { ruleId: "GL-001", category: "Casualty Eligibility", factor: "Contractor Operations Class", operator: "=", baseValue: "Commercial Interior Only", unit: "Class", canOverride: false, guardrail: "No Residential Tract / Roofing", val: "Interior Commercial", pass: true },
      { ruleId: "GL-002", category: "Casualty Eligibility", factor: "Subcontractor Hold Harmless Agreement", operator: "=", baseValue: "Required", unit: "Agreement", canOverride: true, guardrail: "Mandatory Hold Harmless Clause", val: "100% In Place", pass: true },
      { ruleId: "GL-003", category: "Casualty Eligibility", factor: "Maximum Subcontractor Ratio", operator: "<=", baseValue: 50, unit: "%", canOverride: true, guardrail: "<= 50%", val: "30.0%", pass: true },
      { ruleId: "GL-004", category: "Casualty Eligibility", factor: "Maximum 3-Yr Incurred Loss Ratio", operator: "<=", baseValue: 45, unit: "%", canOverride: true, guardrail: "<= 45%", val: "22.1%", pass: true }
    ],
    enrichmentCards: [
      { title: "OSHA Safety Inspection Record", icon: "ph-hard-hat", val: "Zero Violations", label: "Clean Safety Log across 14 Job Sites", tag: "badge-success" },
      { title: "State Contractor License", icon: "ph-identification-badge", val: "Class A Verified", label: "Active in OH, PA, IN with zero bonds revoked", tag: "badge-success" },
      { title: "Credit & Lien Registry", icon: "ph-scales", val: "Zero Mechanic Liens", label: "D&B Score: 86/100", tag: "badge-info" }
    ],
    subjectivities: [
      "Copy of standard Subcontractor Agreement with indemnification and waiver of subrogation.",
      "Certificates of insurance from top 3 subcontractors evidencing $1M GL limits.",
      "Written safety manual and tailgate safety meeting log."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Minor slip & fall on job site (subcontractor fault)", status: "Closed", incurred: "$3,800" },
      { year: "2023 - 2024", desc: "Material damage to adjacent drywall (repaired)", status: "Closed", incurred: "$1,200" },
      { year: "2022 - 2023", desc: "No losses recorded", status: "Clean", incurred: "$0" }
    ],
    quoteNo: "QT-CPC-2026-33901",
    coverageRows: [
      { line: "Commercial General Liability (Each Occurrence)", limit: "$1,000,000 Limit", ded: "$2,500", prem: "$22,000.00" },
      { line: "General Aggregate Limit", limit: "$2,000,000 Aggregate", ded: "N/A", prem: "Included" },
      { line: "Products / Completed Operations Aggregate", limit: "$2,000,000 Aggregate", ded: "$2,500", prem: "$5,500.00" }
    ]
  },

  {
    id: "SUB-48316-IL",
    lobKey: "gl_cpc",
    lobName: "GL CPC - Commercial Package & Contractors",
    channelType: "direct",
    channelName: "Direct Customer Portal (Contractor Portal)",
    priority: "P3",
    priorityScore: 74,
    slaText: "48h FIFO SLA",
    slaCountdown: "32h remaining",
    priorityReason: "Direct Self-Service Submission • Standard Queue Queue",
    // Unified Account View demo: second LOB (GL CPC) for the same
    // Sunstate Industrial Group parent account.
    accountName: "Sunstate Industrial Group",
    insured: "Tri-State General Contractors Group",
    fein: "36-9912048",
    dot: "N/A (Contracting)",
    address: "950 Construction Blvd, Peoria, IL 61602",
    broker: "Direct Customer (Online Portal)",
    email: "bids@tristategc.com",
    desk: "Construction & Commercial Package Team",
    underwriter: "Michael Rossi (Casualty Specialist)",
    exposure: "$3,600,000",
    exposureVal: 3600000,
    authorityLimit: 5000000,
    receivedAt: "2026-08-25 03:30 PM",
    receivedTimestamp: 1787681400000,
    statusText: "Intake Ingested",
    statusBadge: "badge-primary",
    currentStep: 1,
    completedSteps: [],
    docs: [
      { name: "TriState_Commercial_App.pdf", type: "pdf", desc: "Contractor Portal Submission • 4 Pages" },
      { name: "Equipment_and_Payroll_SOV.xlsx", type: "xls", desc: "Equipment schedule & direct labor" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Annual Direct Payroll", val: "$3,600,000", conf: "99.8%" },
      { key: "Contractor Class", val: "Commercial Structural & Electrical", conf: "99.1%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48316-IL",
      source_channel: "Direct Customer Online Portal",
      applicant: {
        legal_name: "Tri-State General Contractors Group",
        fein: "36-9912048",
        annual_payroll: 3600000
      }
    },
    appetiteRules: [
      { ruleId: "GL-001", category: "Casualty Eligibility", factor: "Contractor Operations Class", operator: "=", baseValue: "Eligible Class", unit: "Class", canOverride: false, guardrail: "Eligible Contractor Class", val: "Commercial Grade", pass: true },
      { ruleId: "GL-002", category: "Casualty Eligibility", factor: "Subcontractor Risk Transfer In Place", operator: "=", baseValue: "Required", unit: "Agreement", canOverride: true, guardrail: "Mandatory Hold Harmless", val: "Verified Active", pass: true }
    ],
    enrichmentCards: [
      { title: "OSHA Safety Record", icon: "ph-hard-hat", val: "Zero Major Violations", label: "Past 4 Years Audited", tag: "badge-success" },
      { title: "Illinois State License Board", icon: "ph-identification-badge", val: "Active & Good Standing", label: "License #IL-99412", tag: "badge-success" },
      { title: "Credit Registry Score", icon: "ph-scales", val: "83 / 100", label: "Low Risk Profile", tag: "badge-info" }
    ],
    subjectivities: [
      "Receipt of certificates of insurance from all scheduled subcontractors."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Clean loss record", status: "Clean", incurred: "$0" }
    ],
    quoteNo: "QT-CPC-2026-90412",
    coverageRows: [
      { line: "Commercial General Liability", limit: "$1,000,000 / $2,000,000 Agg", ded: "$2,500", prem: "$19,500.00" }
    ]
  },

  // --------------------------------------------------------------------------
  // 5. GL CAS - HIGH HAZARD CASUALTY & SURPLUS
  // --------------------------------------------------------------------------
  {
    id: "SUB-48420-TX",
    lobKey: "gl_cas",
    lobName: "GL CAS - High Hazard Casualty & Surplus",
    channelType: "broker",
    channelName: "Broker Intake: Amwins Wholesale (Email Submission)",
    priority: "P1",
    priorityScore: 98,
    slaText: "4h Fast-Track SLA",
    slaCountdown: "1h 10m remaining",
    priorityReason: "Amwins Wholesale • $15M High Hazard Exposure • CUO Referral Desk",
    // Archival Policy demo: retired long ago and already archived by a
    // manager — remains fully accessible for audit per policy.
    lifecycleStatus: "retired",
    lifecycleStatusAt: Date.now() - (280 * 24 * 60 * 60 * 1000),
    archived: true,
    archivedAt: Date.now() - (95 * 24 * 60 * 60 * 1000),
    archivedBy: "Elena Rostova (Head of Binding & Policy Operations)",
    insured: "Quantum Energy & Chemical Solutions LLC",
    fein: "95-1049281",
    dot: "N/A (Surplus Casualty)",
    address: "700 Chemical Row, Pasadena, TX 77506",
    broker: "Amwins Specialty Wholesale Brokerage",
    email: "casualty@amwins.com",
    desk: "Complex Surplus Casualty & Energy Desk",
    underwriter: "Victoria Thorne (Senior Casualty Underwriter)",
    exposure: "$15,000,000",
    exposureVal: 15000000,
    authorityLimit: 5000000, // triggers senior referral!
    receivedAt: "2026-08-25 01:20 PM",
    receivedTimestamp: 1787673600000,
    statusText: "Senior Referral",
    statusBadge: "badge-warning",
    currentStep: 5,
    completedSteps: [1, 2, 3, 4],
    docs: [
      { name: "ACORD_Surplus_Casualty_Specialty.pdf", type: "pdf", desc: "Surplus Lines Supplemental • 3.4 MB" },
      { name: "Quantum_Chemical_Bulk_Facility_Schedule.xlsx", type: "xls", desc: "Bulk Storage Tank SOV • 490 KB" },
      { name: "10_Year_Complete_Environmental_Loss_Runs.pdf", type: "pdf", desc: "Full Environmental Loss History" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Total Production Revenue", val: "$15,000,000", conf: "99.6%" },
      { key: "Hazard Classification", val: "Specialty Industrial Lubricants & Polymers", conf: "98.8%" },
      { key: "EPA Tier II Reporting", val: "Full Compliance Verified", conf: "99.0%" },
      { key: "Environmental Containment", val: "110% Secondary Concrete Bunding", conf: "99.4%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48420-TX",
      source_channel: "Wholesale Broker Intake (Amwins)",
      applicant: {
        legal_name: "Quantum Energy & Chemical Solutions LLC",
        fein: "95-1049281",
        annual_revenue: 15000000,
        hazard_class: "Industrial Specialty Blending"
      },
      exposure_risk: {
        requires_senior_signoff: true,
        authority_threshold: 5000000,
        submission_exposure: 15000000
      }
    },
    appetiteRules: [
      { ruleId: "CAS-001", category: "Environmental / Casualty Eligibility", factor: "Minimum Secondary Containment (Bulk Chemical)", operator: ">=", baseValue: 100, unit: "%", canOverride: true, guardrail: ">= 100%", val: "110% Double Bunded", pass: true },
      { ruleId: "CAS-002", category: "Environmental / Casualty Eligibility", factor: "EPA / TCEQ Notice of Violation", operator: "=", baseValue: "Clean Record", unit: "Status", canOverride: false, guardrail: "Clean record past 3 years", val: "0 Active Violations", pass: true },
      { ruleId: "CAS-003", category: "Environmental / Casualty Eligibility", factor: "PFAS / Forever Chemicals Synthesis", operator: "=", baseValue: "No PFAS Operations", unit: "Status", canOverride: false, guardrail: "Strictly Excluded", val: "0% (Strictly Excluded)", pass: true },
      { ruleId: "CAS-004", category: "Environmental / Casualty Eligibility", factor: "Maximum Cumulative 5-Yr Loss History", operator: "<=", baseValue: 100000, unit: "$", canOverride: true, guardrail: "<= $100,000", val: "$12,000 Incurred", pass: true }
    ],
    enrichmentCards: [
      { title: "EPA ECHO Compliance Registry", icon: "ph-flask", val: "100% In Compliance", label: "Clean Air & Clean Water Act Clear", tag: "badge-success" },
      { title: "Hazard hazardous Materials Matrix", icon: "ph-skull", val: "Class 3 Flammable Liquids", label: "NFPA 30 Compliant Storage", tag: "badge-warning" },
      { title: "Moody's Risk Evaluation", icon: "ph-shield-check", val: "Investment Grade B+", label: "Strong Balance Sheet Reserves", tag: "badge-info" }
    ],
    subjectivities: [
      "Third-party engineering inspection of bulk tank secondary containment within 45 days.",
      "Copy of comprehensive emergency spill response plan and contract with certified HAZMAT responder.",
      "Signed and completed pollution exclusion questionnaire."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Minor contained spill in yard - Cleaned per protocol", status: "Closed", incurred: "$6,500" },
      { year: "2023 - 2024", desc: "No losses recorded", status: "Clean", incurred: "$0" },
      { year: "2022 - 2023", desc: "Worker PPE eye irritation incident (Closed)", status: "Closed", incurred: "$5,500" }
    ],
    quoteNo: "QT-CAS-2026-99044",
    coverageRows: [
      { line: "Commercial General Liability (High Hazard Casualty)", limit: "$1,000,000 Each Occurrence / $2,000,000 Agg", ded: "$50,000", prem: "$62,000.00" },
      { line: "Site Pollution Incident Liability Endorsement", limit: "$1,000,000 Limit", ded: "$50,000", prem: "$22,000.00" }
    ]
  },

  {
    id: "SUB-48512-CA",
    lobKey: "gl_cas",
    lobName: "GL CAS - High Hazard Casualty & Surplus",
    channelType: "broker",
    channelName: "Broker Intake: Marsh (API Ingestion)",
    priority: "P2",
    priorityScore: 86,
    slaText: "24h Standard SLA",
    slaCountdown: "16h 40m remaining",
    priorityReason: "Marsh Wholesale • $20M Capacity • Excess Surplus Review",
    // Archival Policy demo: retired only 20 days ago — NOT YET eligible
    // under the default 90-day retention policy.
    lifecycleStatus: "retired",
    lifecycleStatusAt: Date.now() - (20 * 24 * 60 * 60 * 1000),
    insured: "Pacific BioChemical Energy Ltd",
    fein: "94-2201948",
    dot: "N/A (Casualty)",
    address: "1200 Refinery Road, Richmond, CA 94801",
    broker: "Marsh & McLennan Commercial Brokerage",
    email: "energy@marshbrokerage.com",
    desk: "Complex Surplus Casualty & Energy Desk",
    underwriter: "Victoria Thorne (Senior Casualty Underwriter)",
    exposure: "$20,000,000",
    exposureVal: 20000000,
    authorityLimit: 5000000,
    receivedAt: "2026-08-25 04:00 PM",
    receivedTimestamp: 1787683200000,
    statusText: "Senior Referral",
    statusBadge: "badge-warning",
    currentStep: 5,
    completedSteps: [1, 2, 3, 4],
    docs: [
      { name: "Pacific_BioChem_Casualty_App.pdf", type: "pdf", desc: "Surplus Lines Casualty App • 8 Pages" },
      { name: "Environmental_Risk_Assessment.pdf", type: "pdf", desc: "Third-party Phase 1 Audit • 5.1 MB" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Annual Revenue", val: "$20,000,000", conf: "99.7%" },
      { key: "Biofuel Processing Type", val: "Ethanol & Biodiesel Blending", conf: "99.1%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-48512-CA",
      source_channel: "Broker API (Marsh)",
      applicant: {
        legal_name: "Pacific BioChemical Energy Ltd",
        fein: "94-2201948",
        annual_revenue: 20000000
      }
    },
    appetiteRules: [
      { ruleId: "CAS-001", category: "Environmental / Casualty Eligibility", factor: "Minimum Secondary Containment Level", operator: ">=", baseValue: 100, unit: "%", canOverride: true, guardrail: ">= 100%", val: "120% Reinforced", pass: true },
      { ruleId: "CAS-005", category: "Environmental / Casualty Eligibility", factor: "Active EPA Consent Decrees", operator: "=", baseValue: "Zero Outstanding", unit: "Status", canOverride: false, guardrail: "Zero Outstanding Orders", val: "None Active", pass: true }
    ],
    enrichmentCards: [
      { title: "EPA ECHO Compliance", icon: "ph-flask", val: "100% Clear", label: "Clean Air Compliance", tag: "badge-success" },
      { title: "California Cal/OSHA", icon: "ph-identification-badge", val: "Grade A", label: "Zero Major Violations", tag: "badge-success" },
      { title: "Moody's Risk Grade", icon: "ph-shield-check", val: "A- Rated", label: "Excellent Solvency", tag: "badge-info" }
    ],
    subjectivities: [
      "Annual third-party leak detection audit report.",
      "Certified spill prevention control and countermeasure (SPCC) plan."
    ],
    losses: [
      { year: "2023 - 2024", desc: "Minor gasket leak in valve station (Cleaned)", status: "Closed", incurred: "$8,000" }
    ],
    quoteNo: "QT-CAS-2026-77890",
    coverageRows: [
      { line: "Commercial General Liability (Casualty Surplus)", limit: "$1,000,000 / $2,000,000 Agg", ded: "$50,000", prem: "$74,000.00" }
    ]
  },

  // --------------------------------------------------------------------------
  // 6. PRD-016: PRODUCT STUDIO MOTOR CONFIGURATION (Yash_new v2026.08)
  // --------------------------------------------------------------------------
  {
    id: "SUB-PRD016-01-TX",
    lobKey: "prd016",
    lobName: "PRD-016 Yash_new (Motor v2026.08)",
    channelType: "direct",
    channelName: "Direct Web Portal (Product Studio Engine)",
    priority: "P1",
    priorityScore: 95,
    slaText: "4h Fast-Track SLA",
    slaCountdown: "3h 10m remaining",
    priorityReason: "Product Studio PRD-016 Registered Risk • Clean Driving Record",
    insured: "Vikram Sinha (Toyota Fortuner 2024)",
    fein: "IND-8829012",
    dot: "N/A (Personal Lines Motor)",
    address: "B-402 Green Park Extension, New Delhi, DL 110016",
    broker: "Direct Customer (Web Intake)",
    email: "vikram.sinha@example.com",
    desk: "Personal Lines Motor UW Desk",
    underwriter: "Anika Sharma (Product Manager & Motor UW)",
    exposure: "$52,000",
    exposureVal: 52000,
    authorityLimit: 2000000,
    receivedAt: "2026-08-27 11:30 AM",
    receivedTimestamp: 1787827800000,
    statusText: "Ready for Quote",
    statusBadge: "badge-success",
    currentStep: 6,
    completedSteps: [1, 2, 3, 4, 5],
    docs: [
      { name: "PRD016_Motor_Application_VikramSinha.pdf", type: "pdf", desc: "Product Studio Questionnaire • 3 Pages" },
      { name: "Vehicle_Registration_Fortuner.pdf", type: "pdf", desc: "RC & Valuation Document • 1.1 MB" },
      { name: "Driver_Licence_Verification.pdf", type: "pdf", desc: "DL Verification Record • Clean 5 Yrs" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Vehicle Make & Model", val: "Toyota Fortuner 2.8L 4x4 AT", conf: "99.9%" },
      { key: "Year of Manufacture", val: "2024", conf: "99.8%" },
      { key: "Insured Value (IDV)", val: "$50,000", conf: "99.5%" },
      { key: "Primary Driver Age", val: "28 Years", conf: "99.2%" },
      { key: "Jurisdiction", val: "India", conf: "99.7%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-PRD016-01-TX",
      source_channel: "Direct Web Portal (PRD-016 Studio)",
      product_id: "PRD-016",
      product_version: "2026.08",
      applicant: {
        legal_name: "Vikram Sinha",
        driver_age: 28,
        vehicle_make: "Toyota",
        vehicle_model: "Fortuner",
        vehicle_year: 2024,
        vehicle_insured_value: 50000,
        policy_jurisdiction: "India",
        conviction_count: 0
      }
    },
    appetiteRules: [
      { ruleId: "ELG-001", category: "Eligibility", factor: "Minimum Driver Age", operator: ">=", baseValue: 21, unit: "Years", canOverride: true, guardrail: ">= 21", val: "28 Years", pass: true },
      { ruleId: "ELG-002", category: "Eligibility", factor: "Maximum Vehicle Age", operator: "<=", baseValue: 15, unit: "Years", canOverride: false, guardrail: "<= 15", val: "2 Years", pass: true },
      { ruleId: "ELG-003", category: "Eligibility", factor: "Jurisdiction Check", operator: "=", baseValue: "India, UAE, UK", unit: "Jurisdiction", canOverride: false, guardrail: "India, UAE, UK", val: "India", pass: true },
      { ruleId: "ELG-004", category: "Eligibility", factor: "Vehicle Type Allowlist", operator: "=", baseValue: "Private Car / SUV", unit: "Type", canOverride: true, guardrail: "Private Car / SUV", val: "SUV", pass: true }
    ],
    enrichmentCards: [
      { title: "RTO Registration Verification", icon: "ph-car", val: "Active & Verified", label: "DL-01-2024-99120", tag: "badge-success" },
      { title: "NCB History (No Claim Bonus)", icon: "ph-medal", val: "50% NCB Applied", label: "Clean 5-Year History", tag: "badge-success" },
      { title: "CIBIL / Credit Score", icon: "ph-chart-pie", val: "810 / 900", label: "Low Risk Profile", tag: "badge-info" }
    ],
    subjectivities: [
      "Copy of vehicle pre-inspection report.",
      "Self-declaration of zero pending traffic challans."
    ],
    losses: [
      { year: "2024 - 2025", desc: "Clean loss record", status: "Clean", incurred: "$0" }
    ],
    quoteNo: "QT-PRD016-2026-00421",
    coverageRows: [
      { line: "COV-001 Own Damage (Agreed Value)", limit: "$50,000", ded: "$300", prem: "$300.00" },
      { line: "COV-002 Third Party Liability", limit: "$100,000", ded: "$0", prem: "$64.04" },
      { line: "COV-003 Personal Accident", limit: "$25,000", ded: "$0", prem: "$30.00" }
    ]
  },
  {
    id: "SUB-PRD016-02-UAE",
    lobKey: "prd016",
    lobName: "PRD-016 Yash_new (Motor v2026.08)",
    channelType: "broker",
    channelName: "Broker Intake: Marsh UAE",
    priority: "P1",
    priorityScore: 98,
    slaText: "4h Fast-Track SLA",
    slaCountdown: "1h 45m remaining",
    priorityReason: "High-Value Vehicle ($145k Range Rover) • Triggers UW-REF-001 Referral & UW-RSTR-001 Theft Cap",
    insured: "Rashid Al-Maktoum (Range Rover Autobiography)",
    fein: "UAE-9910482",
    dot: "N/A (Personal Lines Motor)",
    address: "Villa 14, Palm Jumeirah, Dubai, UAE",
    broker: "Marsh Specialty Middle East",
    email: "motor@marsh.ae",
    desk: "High-Value Motor Specialist Team",
    underwriter: "Sarah Chen (Senior Motor UW)",
    exposure: "$145,000",
    exposureVal: 145000,
    authorityLimit: 100000,
    receivedAt: "2026-08-27 02:15 PM",
    receivedTimestamp: 1787837700000,
    statusText: "Senior Referral",
    statusBadge: "badge-warning",
    currentStep: 5,
    completedSteps: [1, 2, 3, 4],
    docs: [
      { name: "PRD016_Motor_Application_Rashid.pdf", type: "pdf", desc: "Product Studio Questionnaire • 4 Pages" },
      { name: "RangeRover_Valuation_Certificate.pdf", type: "pdf", desc: "Official Valuation $145,000" },
      { name: "Handwritten_Broker_Cover_Note.pdf", type: "pdf", desc: "Handwritten Broker Cover Note (Scanned) • 1 Page • 210 KB" }
    ],
    ocrFields: [
      { key: "Vehicle Make & Model", val: "Land Rover Range Rover Autobiography", conf: "99.9%" },
      { key: "Insured Value (IDV)", val: "$145,000", conf: "99.8%" },
      { key: "Primary Driver Age", val: "35 Years", conf: "99.4%" },
      { key: "Jurisdiction", val: "UAE", conf: "99.9%" },
      { key: "Broker Handling Note", val: "Fast-track requested; client eager to bind before renewal lapse", conf: "Manual Transcription", source: "Handwritten_Broker_Cover_Note.pdf" }
    ],
    canonicalJson: {
      submission_id: "SUB-PRD016-02-UAE",
      source_channel: "Broker Intake (Marsh UAE)",
      product_id: "PRD-016",
      applicant: {
        legal_name: "Rashid Al-Maktoum",
        driver_age: 35,
        vehicle_make: "Land Rover",
        vehicle_model: "Range Rover",
        vehicle_insured_value: 145000,
        policy_jurisdiction: "UAE",
        conviction_count: 1,
        conviction_severity: "Minor"
      }
    },
    appetiteRules: [
      { ruleId: "ELG-005", category: "Eligibility", factor: "Maximum Insured Value", operator: "<=", baseValue: 200000, unit: "$", canOverride: true, guardrail: "<= $200,000", val: "$145,000", pass: true },
      { ruleId: "UW-REF-001", category: "Referral", factor: "High-Value Referral Threshold", operator: "<=", baseValue: 40000, unit: "$", canOverride: true, guardrail: "<= $40,000", val: "$145,000", pass: false },
      { ruleId: "UW-LOAD-001", category: "Underwriting", factor: "Minor Conviction Loading", operator: "<=", baseValue: 0, unit: "Convictions", canOverride: true, guardrail: "0 Minor Convictions", val: "1 Minor", pass: false },
      { ruleId: "UW-RSTR-001", category: "Underwriting", factor: "Theft Cover Cap", operator: "<=", baseValue: 55000, unit: "$", canOverride: false, guardrail: "<= $55,000 Cap", val: "Active (Capped)", pass: false }
    ],
    enrichmentCards: [
      { title: "Dubai RTO & Police Clear", icon: "ph-shield-check", val: "Verified Clean", label: "TC-990142-DXB", tag: "badge-success" },
      { title: "High-Value Exotic Make", icon: "ph-diamond", val: "Specialist Review Required", label: "UW-REF-001 Triggered", tag: "badge-warning" }
    ],
    subjectivities: [
      "Senior Underwriter sign-off for theft cover limit increase above $55,000.",
      "Installation of certified GPS tracker & anti-theft immobilizer."
    ],
    losses: [
      { year: "2024 - 2025", desc: "No losses reported", status: "Clean", incurred: "$0" }
    ],
    quoteNo: "QT-PRD016-2026-99012",
    coverageRows: [
      { line: "COV-001 Own Damage (Agreed Value)", limit: "$145,000", ded: "$500", prem: "$870.00" },
      { line: "COV-004 Theft & Total Loss (Restricted Cap)", limit: "$55,000 (Capped)", ded: "10%", prem: "$145.00" },
      { line: "UW-LOAD-001 Conviction Loading", limit: "+25% Net Premium", ded: "N/A", prem: "$253.75" }
    ]
  }
];

// Screen & Workflow Steps Configuration (7 Workflow Steps: Doc Ingestion -> Quote & Bind)
const WORKFLOW_STEPS = [
  { step: 1, id: "screen-2", title: "Doc Ingestion & Schema / OCR", shortTitle: "Doc Ingestion", icon: "ph-receipt" },
  { step: 2, id: "screen-3", title: "FEIN & Appetite Clearance", shortTitle: "Clearance Check", icon: "ph-shield-check" },
  { step: 3, id: "screen-4", title: "Enrichment & Smart Routing", shortTitle: "Data Enrichment", icon: "ph-tree-structure" },
  { step: 4, id: "screen-5", title: "Underwriting Workbench", shortTitle: "UW Workbench", icon: "ph-briefcase" },
  { step: 5, id: "screen-6", title: "Authority & Referral Desk", shortTitle: "Authority Desk", icon: "ph-scales" },
  { step: 6, id: "screen-7", title: "LOB Rating & Pricing Engine", shortTitle: "Rating Engine", icon: "ph-calculator" },
  { step: 7, id: "screen-8", title: "Formal Quote & Policy Binding", shortTitle: "Quote & Bind", icon: "ph-signature" }
];

const SCREEN_ORDER = [
  { id: "screen-1", num: 1, title: "Intake & Submissions Hub", shortTitle: "Intake Hub", phase: "Phase 1", phaseGroup: "phaseGroup1", icon: "ph-tray" },
  ...WORKFLOW_STEPS.map(w => ({ id: w.id, num: w.step + 1, title: w.title, shortTitle: w.shortTitle, phase: "Workflow", phaseGroup: "workflow", icon: w.icon })),
  { id: "screen-9", num: 9, title: "Decline Archive & System Logs", shortTitle: "Decline Archive", phase: "Exit", phaseGroup: "phaseGroupExit", icon: "ph-prohibit" }
];

// Current State
let currentPage = "intake"; // 'intake' | 'workflow' | 'archive'
let activeSubmissionId = "SUB-48213-TX";
let currentWorkflowStep = 1; // 1 to 7 (Workflow Stepper starts at Doc Ingestion = Step 1)
let currentLOBFilter = "trucking"; // 'trucking' | 'property' | 'mpl' | 'gl_cpc' | 'gl_cas' | 'all'
let currentTableFilter = "all"; // 'all' | 'broker' | 'direct' | 'referral'
let currentQueueSort = "priority"; // 'priority' | 'fifo' | 'exposure'
let currentSearchTerm = "";
let exposureScenario = "within"; // 'within' | 'exceeds'
let currentScreenId = "screen-1";
let currentUserRole = "junior"; // 'assistant' | 'junior' | 'senior_uw' | 'senior' | 'binder' | 'auditor'
let modalCurrentInspectingStep = 1;
let modalActiveTab = "stepView"; // 'stepView' | 'envelope'

const USER_ROLES_CONFIG = {
  assistant: {
    name: "Emily Watson",
    title: "Intake & Clearance Assistant (UA)",
    limit: 0,
    limitText: "$0 Authority (Clearance & Triage Only)",
    icon: "📋",
    description: "Clearance, document ingestion and initial data verification persona."
  },
  junior: {
    name: "Sarah Jenkins",
    title: "Junior Underwriter (Level 2 Primary Desk)",
    limit: 2000000,
    limitText: "$2,000,000 Level-2 Junior Authority",
    icon: "👨‍💼",
    description: "Standard commercial underwriting accounts under $2.0M exposure."
  },
  senior_uw: {
    name: "David Chen",
    title: "Senior Commercial Underwriter (Level 3 Line Desk)",
    limit: 10000000,
    limitText: "$10,000,000 Senior Line Authority",
    icon: "👩‍💼",
    description: "Complex fleet and multi-location property risks up to $10.0M."
  },
  senior: {
    name: "Marcus Vance",
    title: "Chief Underwriting Officer (CUO / Referral Desk)",
    limit: 25000000,
    limitText: "$25,000,000 Executive CUO Limit",
    icon: "👔",
    description: "Executive referrals, treaty exceptions and sign-off authority."
  },
  binder: {
    name: "Elena Rostova",
    title: "Head of Binding & Policy Operations",
    limit: 50000000,
    limitText: "$50,000,000 Enterprise Binding Limit",
    icon: "⚡",
    description: "Formal binder approval, policy issuance and operational execution."
  },
  auditor: {
    name: "Jonathan Reed",
    title: "Risk & Compliance Auditor",
    limit: 999999999,
    limitText: "Read-Only Audit & Compliance Authority",
    icon: "🛡️",
    description: "Sanctions checking, loss run audits and regulatory compliance inspection."
  },
  admin: {
    name: "Priya Nair",
    title: "System Administrator",
    limit: 999999999,
    limitText: "Full System Administration Authority",
    icon: "🛠️",
    description: "Manages team-wide process visibility and configures role-based permissions across the platform."
  }
};

// ============================================================================
// GRANULAR ROLE-BASED ACCESS CONTROL (RBAC) — Requirement #5
// ============================================================================
// Per-role, per-resource permission matrix covering view / edit / approve /
// override / archive. This is the single source of truth for access control
// across the app — enforced at every gated action, and editable live by the
// 'admin' role from the User Master dashboard.
const RBAC_RESOURCES = [
  { key: "documents", label: "Documents" },
  { key: "submissionData", label: "Submission Data" },
  { key: "workflow", label: "Workflow Steps" },
  { key: "archival", label: "Archival Policy & Records" },
  { key: "reviewRules", label: "Review Routing Rules" },
  { key: "appetiteRules", label: "Appetite Rules Override (MGA Authority)" },
  { key: "premiumAdjustment", label: "Premium Adjustment" },
  { key: "teamActivity", label: "Team Activity (Manager View)" },
  { key: "unifiedAccount", label: "Unified Account View (Cross-LOB)" },
  { key: "auditLog", label: "Audit Log (Compliance View)" }
];
const RBAC_ACTIONS = ["view", "edit", "approve", "override", "archive"];

function defaultPermissionsMatrix() {
  const all = (v, e, a, o, ar) => ({ view: v, edit: e, approve: a, override: o, archive: ar });
  return {
    assistant: {
      documents: all(true, false, false, false, false),
      submissionData: all(true, false, false, false, false),
      workflow: all(true, false, false, false, false),
      archival: all(true, false, false, false, false),
      reviewRules: all(true, false, false, false, false),
      appetiteRules: all(true, false, false, false, false),
      premiumAdjustment: all(true, false, false, false, false),
      teamActivity: all(false, false, false, false, false),
      unifiedAccount: all(false, false, false, false, false),
      auditLog: all(false, false, false, false, false)
    },
    junior: {
      documents: all(true, true, false, false, false),
      submissionData: all(true, true, false, false, false),
      workflow: all(true, false, true, false, false),
      archival: all(true, false, false, false, false),
      reviewRules: all(true, false, false, false, false),
      appetiteRules: all(true, false, false, false, false),
      premiumAdjustment: all(true, true, false, false, false),
      teamActivity: all(false, false, false, false, false),
      unifiedAccount: all(false, false, false, false, false),
      auditLog: all(false, false, false, false, false)
    },
    senior_uw: {
      documents: all(true, true, false, false, false),
      submissionData: all(true, true, false, false, false),
      workflow: all(true, false, true, true, false),
      archival: all(true, true, false, false, true),
      reviewRules: all(true, false, false, false, false),
      appetiteRules: all(true, false, false, true, false),
      premiumAdjustment: all(true, true, false, false, false),
      teamActivity: all(false, false, false, false, false),
      unifiedAccount: all(true, false, false, false, false),
      auditLog: all(false, false, false, false, false)
    },
    senior: {
      documents: all(true, true, true, true, false),
      submissionData: all(true, true, true, true, false),
      workflow: all(true, true, true, true, false),
      archival: all(true, true, true, true, true),
      reviewRules: all(true, true, false, false, false),
      appetiteRules: all(true, false, false, true, false),
      premiumAdjustment: all(true, true, true, true, false),
      teamActivity: all(false, false, false, false, false),
      unifiedAccount: all(true, false, false, false, false),
      auditLog: all(true, false, false, false, false)
    },
    binder: {
      documents: all(true, true, true, true, true),
      submissionData: all(true, true, true, true, true),
      workflow: all(true, true, true, true, false),
      archival: all(true, true, true, true, true),
      reviewRules: all(true, true, false, false, false),
      appetiteRules: all(true, false, false, true, false),
      premiumAdjustment: all(true, true, true, true, false),
      teamActivity: all(false, false, false, false, false),
      unifiedAccount: all(true, false, false, false, false),
      auditLog: all(true, false, false, false, false)
    },
    auditor: {
      documents: all(true, false, false, false, false),
      submissionData: all(true, false, false, false, false),
      workflow: all(true, false, false, false, false),
      archival: all(true, false, false, false, false),
      reviewRules: all(true, false, false, false, false),
      appetiteRules: all(true, false, false, false, false),
      premiumAdjustment: all(true, false, false, false, false),
      teamActivity: all(false, false, false, false, false),
      unifiedAccount: all(true, false, false, false, false),
      auditLog: all(true, false, false, false, false)
    },
    admin: {
      documents: all(true, true, true, true, true),
      submissionData: all(true, true, true, true, true),
      workflow: all(true, true, true, true, true),
      archival: all(true, true, true, true, true),
      reviewRules: all(true, true, true, true, true),
      appetiteRules: all(true, true, true, true, true),
      premiumAdjustment: all(true, true, true, true, true),
      teamActivity: all(true, true, true, true, true),
      unifiedAccount: all(true, true, true, true, true),
      auditLog: all(true, true, true, true, true)
    }
  };
}

let PERMISSIONS_MATRIX = defaultPermissionsMatrix();

/** Checks whether the CURRENT active persona has a given action on a resource. */
function hasPermission(resource, action) {
  const roleMatrix = PERMISSIONS_MATRIX[currentUserRole];
  if (!roleMatrix || !roleMatrix[resource]) return false;
  return !!roleMatrix[resource][action];
}

/** Shows a standard "access denied" toast for a blocked action. */
function denyPermission(resource, action) {
  const resourceLabel = (RBAC_RESOURCES.find(r => r.key === resource) || {}).label || resource;
  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  showToast(`⛔ ${roleConfig.title} does not have "${action}" permission on ${resourceLabel}. Switch to an authorized persona or ask an Admin to update permissions in User Master.`, "danger");
}

// ============================================================================
// UNDERWRITER JURISDICTION & LOB AUTHORITY
// ----------------------------------------------------------------------------
// Extends the User Master roster (separate from the RBAC action matrix above,
// which governs WHAT a role can do) with WHERE and on WHICH lines each roster
// member is authorized to underwrite: licensed states, lines of business, and
// the specific coverages within those lines. Editable live by 'admin' from
// the User Master dashboard, same as the RBAC matrix.
// ============================================================================
const US_STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }
];
const ALL_STATE_CODES = US_STATES.map(s => s.code);

// Lines of business the platform underwrites, keyed the same way as
// currentLOBFilter / submission.lobKey, each with its real coverage lines
// (pulled from the Screen-4 coverage schedules already in the dataset).
const LOB_CATALOG = [
  {
    key: "trucking",
    name: "Commercial Auto / Trucking",
    coverages: [
      "Commercial Auto Liability (Combined Single Limit)",
      "Auto Physical Damage (Comp & Collision)",
      "Motor Truck Cargo Legal Liability"
    ]
  },
  {
    key: "property",
    name: "Commercial Property",
    coverages: [
      "Building Real Property Coverage (Special Form / RC)",
      "Business Personal Property (Contents / Inventory)",
      "Business Income with Extra Expense",
      "Building & Refrigeration Structure"
    ]
  },
  {
    key: "mpl",
    name: "MPL - Professional Liability",
    coverages: [
      "Errors & Omissions (E&O) Professional Liability",
      "Directors & Officers (D&O) Management Liability"
    ]
  },
  {
    key: "gl_cpc",
    name: "GL CPC - Commercial Package & Contractors",
    coverages: [
      "Commercial General Liability (Each Occurrence)",
      "General Aggregate Limit",
      "Products / Completed Operations Aggregate"
    ]
  },
  {
    key: "gl_cas",
    name: "GL CAS - High Hazard Casualty & Surplus",
    coverages: [
      "Commercial General Liability (High Hazard Casualty)",
      "Site Pollution Incident Liability Endorsement"
    ]
  }
];
const ALL_LOB_KEYS = LOB_CATALOG.map(l => l.key);

/** Union of coverage names across a set of LOB keys, de-duplicated. */
function getCoveragesForLOBs(lobKeys) {
  const set = new Set();
  (lobKeys || []).forEach(key => {
    const lob = LOB_CATALOG.find(l => l.key === key);
    if (lob) lob.coverages.forEach(c => set.add(c));
  });
  return Array.from(set);
}

// ============================================================================
// SHARED HELPERS: DERIVED PREMIUM & TRUST SCORE (used by #2, #3, #7)
// ============================================================================
// The dataset does not carry a distinct "quoted premium" separate from
// exposure, and no trust/risk score. Both are derived deterministically per
// submission (stable across renders) unless the user has since adjusted the
// premium, in which case the adjusted value is authoritative.
function getSubmissionPremium(sub) {
  if (typeof sub.currentPremium === "number") return sub.currentPremium;
  const base = Math.round((sub.exposureVal || 0) * 0.045 / 100) * 100;
  return Math.max(base, 500);
}

function getSubmissionTrustScore(sub) {
  if (typeof sub.trustScore === "number") return sub.trustScore;
  // Deterministic pseudo-score derived from submission id so it's stable.
  let hash = 0;
  for (let i = 0; i < sub.id.length; i++) hash = (hash * 31 + sub.id.charCodeAt(i)) >>> 0;
  const score = 55 + (hash % 41); // 55–95 range
  sub.trustScore = score;
  return score;
}

// ============================================================================
// UNDERWRITING DISCRETIONARY PRICING (POST-RATING)
// ----------------------------------------------------------------------------
// Real insurance workflow: 1) Base Rating Engine computes Base Premium from
// standard factors. 2) AFTER rating, the underwriter reviews the account's
// safety scores, loss history and overall risk profile and applies a manual
// Credit (discount, up to -15%) or Debit (surcharge, up to +25%). 3) Taxes
// & fees are applied on top to produce the Final Quoted Premium.
// ============================================================================
const DISCRETIONARY_MAX_CREDIT_PCT = 15;   // underwriter can discount up to -15%
const DISCRETIONARY_MAX_DEBIT_PCT = 25;    // underwriter can surcharge up to +25%
const DISCRETIONARY_TAX_RATE_PCT = 3.2;    // fixed taxes & fees applied last

/**
 * Base Premium for the Discretionary Pricing flow comes directly from the
 * Live Rating Engine Payload JSON (Screen 6) — the same per-coverage-line
 * premium figures shown in that JSON viewer — NOT a separately derived
 * number. This keeps "Base Rating" genuinely tied to the rating payload
 * output, per the required flow: Base Rating (from JSON) → Underwriter
 * Discretionary Credit/Debit → Final Quote.
 */
function getBasePremiumFromRatingPayload(sub) {
  const payload = getSubmissionRatingPayload(sub);
  const vehicles = payload.vehicles || payload.vehicle_list || [];
  let total = 0;
  let found = false;

  vehicles.forEach(v => {
    const raw = v.liability_premium || v.al_premium_wo_mod_factor || v.pd_premium;
    if (raw) {
      const num = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
      if (!isNaN(num)) { total += num; found = true; }
    }
  });

  // Fallback: sum coverageRows directly if the payload didn't expose vehicles,
  // then fall back further to the generic derived premium as a last resort.
  if (!found && sub.coverageRows && sub.coverageRows.length) {
    sub.coverageRows.forEach(row => {
      const num = parseFloat(String(row.prem || "").replace(/[^0-9.]/g, ""));
      if (!isNaN(num)) { total += num; found = true; }
    });
  }

  return found ? Math.round(total) : getSubmissionPremium(sub);
}

function ensureDiscretionaryPricingSeed(sub) {
  if (!sub.discretionaryPricing) {
    const baseFromPayload = getBasePremiumFromRatingPayload(sub);
    sub.discretionaryPricing = {
      basePremium: baseFromPayload,
      adjustmentType: null,   // 'credit' | 'debit' | null
      adjustmentPercent: 0,
      reason: null,
      appliedBy: null,
      appliedAt: null,
      finalPremium: baseFromPayload
    };
  }
  return sub.discretionaryPricing;
}

function computeFinalQuotedPremium(basePremium, adjustmentType, adjustmentPercent) {
  const signedPct = adjustmentType === "credit" ? -Math.abs(adjustmentPercent) : Math.abs(adjustmentPercent);
  const afterAdjustment = basePremium * (1 + signedPct / 100);
  const afterTax = afterAdjustment * (1 + DISCRETIONARY_TAX_RATE_PCT / 100);
  return Math.round(afterTax);
}

function renderDiscretionaryPricingCard(sub) {
  const dp = ensureDiscretionaryPricingSeed(sub);
  const basePremium = dp.basePremium;
  const hasApplied = !!dp.adjustmentType;

  const previewFinal = hasApplied
    ? dp.finalPremium
    : computeFinalQuotedPremium(basePremium, null, 0);

  return `
    <div class="card mb-3" id="discretionaryPricingCard">
      <div class="card-header">
        <h3><i class="ph ph-sliders"></i> Underwriting Discretionary Pricing (Post-Rating)</h3>
        <span class="badge ${hasApplied ? 'badge-success' : 'badge-warning'}">${hasApplied ? 'Applied' : 'Not Yet Applied'}</span>
      </div>
      <div class="card-body">
        <p class="text-xs text-muted mb-2">After the base rating engine computes the standard premium, the underwriter reviews the account's safety scores, loss history and overall risk profile, then applies a manual credit or debit before final quote generation.</p>

        <table class="data-table mb-3">
          <tbody>
            <tr>
              <td style="width:60%;"><strong>1. Base Premium</strong><br><span class="text-xs text-muted">From standard rating factors (coverages, fleet size, commodity, loss runs)</span></td>
              <td class="font-mono text-right"><strong>$${basePremium.toLocaleString()}</strong></td>
            </tr>
            <tr>
              <td><strong>2. Underwriter Credit / Debit</strong><br><span class="text-xs text-muted">${hasApplied ? (dp.reason || '—') : 'Not yet applied'}</span></td>
              <td class="font-mono text-right">
                ${hasApplied
                  ? `<strong style="color:${dp.adjustmentType === 'credit' ? 'var(--color-success)' : 'var(--color-danger)'};">${dp.adjustmentType === 'credit' ? '−' : '+'}${dp.adjustmentPercent}%</strong>`
                  : `<span class="text-muted">—</span>`}
              </td>
            </tr>
            <tr>
              <td><strong>3. Taxes & Fees</strong><br><span class="text-xs text-muted">Applied on top of adjusted premium</span></td>
              <td class="font-mono text-right">+${DISCRETIONARY_TAX_RATE_PCT}%</td>
            </tr>
            <tr style="background:var(--color-surface); font-weight:700;">
              <td style="text-align:right;">Final Quoted Premium</td>
              <td class="font-mono text-right" style="font-size:15px; color:var(--color-brand-dark);">$${previewFinal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        ${hasApplied ? `
        <div class="alert alert-success" style="font-size:12px;">
          <i class="ph ph-check-circle"></i> Applied by <strong>${dp.appliedBy}</strong> on ${dp.appliedAt}.
        </div>
        <button class="btn btn-outline btn-sm mt-2" onclick="openDiscretionaryPricingModal('${sub.id}')"><i class="ph ph-pencil-simple"></i> Revise Credit/Debit</button>
        ` : `
        <button class="btn btn-primary" onclick="openDiscretionaryPricingModal('${sub.id}')"><i class="ph ph-sliders"></i> Apply Discretionary Pricing</button>
        `}
      </div>
    </div>`;
}

let discretionaryPricingTargetId = null;

function openDiscretionaryPricingModal(subId) {
  if (!hasPermission("premiumAdjustment", "edit")) {
    denyPermission("premiumAdjustment", "edit");
    return;
  }

  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId);
  const dp = ensureDiscretionaryPricingSeed(sub);
  const modal = document.getElementById("discretionaryPricingModal");
  const body = document.getElementById("discretionaryPricingModalBody");
  if (!sub || !modal || !body) return;

  discretionaryPricingTargetId = subId;
  const trustScore = getSubmissionTrustScore(sub);

  body.innerHTML = `
    <div style="font-size:13px; margin-bottom:10px;">
      <strong>Submission:</strong> <code>${sub.id}</code> — ${sub.insured || "N/A"}
    </div>
    <div class="alert alert-info mb-3" style="font-size:12.5px;">
      <i class="ph ph-info"></i> Base Premium: <strong>$${dp.basePremium.toLocaleString()}</strong> • Trust/Risk Score: <strong>${trustScore}/100</strong>. Review safety scores, loss history and overall risk profile before deciding.
    </div>

    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">Adjustment Type</label>
      <select id="dpAdjustmentType" class="form-control" onchange="updateDiscretionaryPricingPreview()">
        <option value="credit" ${dp.adjustmentType === "credit" || !dp.adjustmentType ? "selected" : ""}>Credit (Discount) — favorable risk profile</option>
        <option value="debit" ${dp.adjustmentType === "debit" ? "selected" : ""}>Debit (Surcharge) — elevated risk profile</option>
      </select>
    </div>

    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;" id="dpPercentLabel">Credit Percentage (0–${DISCRETIONARY_MAX_CREDIT_PCT}%)</label>
      <input type="number" id="dpPercentInput" class="form-control" min="0" max="${DISCRETIONARY_MAX_DEBIT_PCT}" value="${dp.adjustmentPercent || 0}" oninput="updateDiscretionaryPricingPreview()">
      <p class="text-xs text-muted" style="margin-top:4px;">Credit capped at −${DISCRETIONARY_MAX_CREDIT_PCT}% (e.g. telematics installed, clean inspection record). Debit capped at +${DISCRETIONARY_MAX_DEBIT_PCT}% (e.g. driver turnover, adverse losses).</p>
    </div>

    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">Underwriting Rationale <span style="color:var(--color-danger);">*</span></label>
      <textarea id="dpReason" class="form-control" rows="3" placeholder="e.g. Telematics installed fleet-wide, clean DOT inspection record over 24 months, no preventable accidents...">${dp.reason || ""}</textarea>
    </div>

    <div id="dpPreviewArea"></div>
  `;

  modal.style.display = "flex";
  updateDiscretionaryPricingPreview();
}

function updateDiscretionaryPricingPreview() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === discretionaryPricingTargetId);
  if (!sub) return;
  const dp = ensureDiscretionaryPricingSeed(sub);

  const typeSelect = document.getElementById("dpAdjustmentType");
  const percentInput = document.getElementById("dpPercentInput");
  const percentLabel = document.getElementById("dpPercentLabel");
  const previewArea = document.getElementById("dpPreviewArea");
  if (!typeSelect || !percentInput || !previewArea) return;

  const type = typeSelect.value;
  const maxAllowed = type === "credit" ? DISCRETIONARY_MAX_CREDIT_PCT : DISCRETIONARY_MAX_DEBIT_PCT;
  percentLabel.textContent = `${type === "credit" ? "Credit" : "Debit"} Percentage (0–${maxAllowed}%)`;
  percentInput.max = maxAllowed;

  let pct = parseFloat(percentInput.value) || 0;
  if (pct > maxAllowed) { pct = maxAllowed; percentInput.value = maxAllowed; }
  if (pct < 0) { pct = 0; percentInput.value = 0; }

  const finalPremium = computeFinalQuotedPremium(dp.basePremium, type, pct);
  previewArea.innerHTML = `
    <div class="alert ${type === 'credit' ? 'alert-success' : 'alert-warning'}" style="font-size:12.5px;">
      <i class="ph ph-calculator"></i> Base $${dp.basePremium.toLocaleString()} ${type === 'credit' ? '−' : '+'} ${pct}% ${type} + ${DISCRETIONARY_TAX_RATE_PCT}% taxes = <strong>Final Quoted Premium: $${finalPremium.toLocaleString()}</strong>
    </div>`;
}

function closeDiscretionaryPricingModal() {
  const modal = document.getElementById("discretionaryPricingModal");
  if (modal) modal.style.display = "none";
  discretionaryPricingTargetId = null;
}

function saveDiscretionaryPricing() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === discretionaryPricingTargetId);
  if (!sub) return;

  if (!hasPermission("premiumAdjustment", "edit")) {
    denyPermission("premiumAdjustment", "edit");
    return;
  }

  const type = document.getElementById("dpAdjustmentType").value;
  const maxAllowed = type === "credit" ? DISCRETIONARY_MAX_CREDIT_PCT : DISCRETIONARY_MAX_DEBIT_PCT;
  let pct = parseFloat(document.getElementById("dpPercentInput").value) || 0;
  const reason = document.getElementById("dpReason").value.trim();

  if (!reason) {
    showToast("⛔ Underwriting rationale is required to apply a credit or debit.", "danger");
    return;
  }
  if (pct < 0 || pct > maxAllowed) {
    showToast(`⛔ ${type === "credit" ? "Credit" : "Debit"} must be between 0% and ${maxAllowed}%.`, "danger");
    return;
  }

  const dp = ensureDiscretionaryPricingSeed(sub);
  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  const finalPremium = computeFinalQuotedPremium(dp.basePremium, type, pct);

  dp.adjustmentType = type;
  dp.adjustmentPercent = pct;
  dp.reason = reason;
  dp.appliedBy = `${roleConfig.name} (${roleConfig.title})`;
  dp.appliedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
  dp.finalPremium = finalPremium;

  sub.currentPremium = finalPremium;

  if (!sub.decisionLog) sub.decisionLog = [];
  sub.decisionLog.push({
    step: 7,
    decision: `discretionary_${type}`,
    by: dp.appliedBy,
    at: dp.appliedAt,
    notes: `Applied ${type === "credit" ? "-" : "+"}${pct}% ${type} (${reason}). Base $${dp.basePremium.toLocaleString()} → Final $${finalPremium.toLocaleString()}.`
  });

  showToast(`✅ ${type === "credit" ? "Credit" : "Debit"} of ${pct}% applied. Final Quoted Premium: $${finalPremium.toLocaleString()}.`, "success");
  closeDiscretionaryPricingModal();

  const container = document.getElementById("discretionaryPricingContainer");
  if (container) container.innerHTML = renderDiscretionaryPricingCard(sub);

  renderSubmissionsTable();
  refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
}

// ============================================================================
// 2. INITIALIZATION & SETUP
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupNavigationEvents();
  restoreSidebarCollapsedState();
  setupLOBSelector();
  setupDiagramModal();
  renderSubmissionsTable();
  selectSubmission(activeSubmissionId, false);
  showIntakePage();
});

function setupNavigationEvents() {
  // Note: the sidebar toggle button already has an inline onclick="toggleSidebar()"
  // in the HTML. Do NOT also addEventListener here — doing both fires the
  // toggle twice per click (collapse then immediately re-expand), which
  // makes the button appear completely non-functional.
}

function changeUserRole(role) {
  currentUserRole = role;
  const roleSelect = document.getElementById("userRoleSelect");
  if (roleSelect && roleSelect.value !== role) roleSelect.value = role;

  const roleConfig = USER_ROLES_CONFIG[role] || USER_ROLES_CONFIG.junior;

  // Update sidebar user persona
  const uAvatar = document.getElementById("sidebarUserAvatar");
  const uName = document.getElementById("sidebarUserName");
  const uTitle = document.getElementById("sidebarUserRoleTitle");
  if (uAvatar) uAvatar.textContent = roleConfig.icon;
  if (uName) uName.textContent = roleConfig.name;
  if (uTitle) uTitle.textContent = `${roleConfig.title.split(' ')[0]} UW (${roleConfig.limitText.split(' ')[0]})`;

  // Simplified UI: the whole Admin-only nav group (User Master, Team
  // Activity, Archive) is one section that shows/hides together.
  const adminSection = document.getElementById("sidebarAdminSection");
  if (adminSection) adminSection.style.display = role === "admin" ? "block" : "none";
  if (role !== "admin" && ["user-master", "team-activity", "archive"].includes(currentPage)) {
    showIntakePage();
  }

  // Audit Log: visible to Compliance/Executive/Binding/Admin personas only
  // (whoever holds auditLog.view in the RBAC matrix), independent of the
  // Admin-only nav group above.
  const complianceSection = document.getElementById("sidebarComplianceSection");
  const canViewAuditLog = PERMISSIONS_MATRIX[role] && PERMISSIONS_MATRIX[role].auditLog && PERMISSIONS_MATRIX[role].auditLog.view;
  if (complianceSection) complianceSection.style.display = canViewAuditLog ? "block" : "none";
  if (!canViewAuditLog && currentPage === "audit-log") {
    showIntakePage();
  }

  // Toggle "Unified Account View" nav item visibility (hidden for roles
  // without unifiedAccount.view permission, e.g. Junior Underwriter)
  const unifiedAccountNav = document.getElementById("navItemUnifiedAccount");
  const canViewUnifiedAccount = PERMISSIONS_MATRIX[role] && PERMISSIONS_MATRIX[role].unifiedAccount && PERMISSIONS_MATRIX[role].unifiedAccount.view;
  if (unifiedAccountNav) unifiedAccountNav.style.display = canViewUnifiedAccount ? "flex" : "none";
  if (!canViewUnifiedAccount && currentPage === "unified-account") {
    showIntakePage();
  }

  if (role === "senior") {
    filterSubmissionsTable("referral");
    showToast(`${roleConfig.icon} Active Persona: ${roleConfig.name} (${roleConfig.title}). Referral Queue & Executive Sign-off unlocked.`, "info");
  } else if (role === "assistant") {
    filterSubmissionsTable("all");
    showToast(`${roleConfig.icon} Active Persona: ${roleConfig.name} (${roleConfig.title}). Intake Hub & Ingestion Clearance active.`, "info");
  } else if (role === "auditor") {
    filterSubmissionsTable("all");
    showToast(`${roleConfig.icon} Active Persona: ${roleConfig.name} (${roleConfig.title}). Compliance & Audit Log view active.`, "info");
  } else {
    filterSubmissionsTable("all");
    showToast(`${roleConfig.icon} Active Persona: ${roleConfig.name} (${roleConfig.title}). Limit: ${roleConfig.limitText}.`, "info");
  }

  // Refresh Table highlights
  renderSubmissionsTable();

  // Refresh Authority Screen, Appetite Rules table, and Vehicles Workbench if sub is loaded —
  // all are permission-gated (appetiteRules override, base rate override, authority sign-off)
  // and must reflect the newly active persona immediately, even if the
  // user is already sitting on that screen when they switch roles.
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (sub) {
    renderAuthorityScreen(sub);
    renderAppetiteRules(sub.appetiteRules);
    renderUnderwritingWorkbench(sub);
  }
}

function setupLOBSelector() {
  const lobSelect = document.getElementById("lobSelect");
  if (lobSelect) {
    lobSelect.addEventListener("change", (e) => {
      const chosenLob = e.target.value;
      currentLOBFilter = chosenLob;

      // Find first submission matching this LOB (or first overall if 'all')
      let match = null;
      if (chosenLob === "all") {
        match = SUBMISSIONS_DATASET[0];
      } else {
        match = SUBMISSIONS_DATASET.find(s => s.lobKey === chosenLob);
      }

      if (match) {
        selectSubmission(match.id, false);
        renderSubmissionsTable();
        showToast(`LOB Filtered: ${match.lobName} • Queue & Enrichment Synchronized`, "info");
      } else {
        renderSubmissionsTable();
      }
    });
  }
}

function changeQueueSorting(sortMode) {
  currentQueueSort = sortMode;
  renderSubmissionsTable();
  if (sortMode === "fifo") {
    showToast("Queue Order: FIFO (First-In, First-Out by arrival timestamp)", "info");
  } else if (sortMode === "priority") {
    showToast("Queue Order: Priority & SLA (Urgent P1 Cases First)", "success");
  } else if (sortMode === "exposure") {
    showToast("Queue Order: Highest Exposure / Total Insured Value First", "info");
  }
}

function escalateSubmissionPriority(pLevel) {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (!sub) return;

  sub.priority = pLevel;
  if (pLevel === "P1") {
    sub.priorityScore = 98;
    sub.slaText = "4h Fast-Track SLA";
    sub.slaCountdown = "3h 50m remaining";
    sub.priorityReason = "Manual Underwriter Escalation (P1 Highest Priority SLA Activated)";
  } else if (pLevel === "P2") {
    sub.priorityScore = 85;
    sub.slaText = "24h Standard SLA";
    sub.slaCountdown = "18h 30m remaining";
    sub.priorityReason = "Standard High Priority SLA";
  } else {
    sub.priorityScore = 70;
    sub.slaText = "48h FIFO SLA";
    sub.slaCountdown = "36h remaining";
    sub.priorityReason = "Standard FIFO Queue Position";
  }

  // Update Screen 4 Triage Card
  const bBadge = document.getElementById("triagePriorityBadge");
  const bSla = document.getElementById("assignedSlaTarget");
  const bCount = document.getElementById("triageSlaCountdown");
  if (bBadge) {
    bBadge.className = `badge ${pLevel === 'P1' ? 'badge-danger' : (pLevel === 'P2' ? 'badge-warning' : 'badge-info')}`;
    bBadge.textContent = `Priority: ${pLevel} - ${pLevel === 'P1' ? 'Highest' : (pLevel === 'P2' ? 'High' : 'FIFO')} (Score: ${sub.priorityScore}/100)`;
  }
  if (bSla) bSla.textContent = sub.slaText;
  if (bCount) bCount.textContent = sub.slaCountdown;

  // Reflect the new priority everywhere else this submission is displayed:
  // workflow top header pill, all downstream screens/cards bound to this
  // submission (quote summaries, case summary modal, etc.), the intake
  // table (row badge + referral filter/highlighting), and Team Activity's
  // delayed-case heuristic if that dashboard is currently open.
  updateActiveCaseHeaders(sub);
  renderAllDownstreamScreens(sub);
  renderSubmissionsTable();
  refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
  showToast(`⚡ Priority for ${sub.insured} updated to ${pLevel}! Queue rank updated.`, pLevel === 'P1' ? 'danger' : 'success');
}

function setupDiagramModal() {
  const btn = document.getElementById("btnToggleFlowchart");
  if (btn) {
    btn.addEventListener("click", () => {
      const modal = document.getElementById("diagramModal");
      if (modal) modal.classList.add("active");
    });
  }
}

function closeFlowchartModal() {
  const modal = document.getElementById("diagramModal");
  if (modal) modal.classList.remove("active");
}

function navFromDiagram(targetScreen) {
  closeFlowchartModal();
  goToScreen(targetScreen);
  showToast(`Navigated to ${targetScreen.toUpperCase()} from Architecture Diagram`, "info");
}

// ============================================================================
// 3. SIDEBAR TOGGLE & FULL-SCREEN
// ============================================================================
function toggleSidebar() {
  const layout = document.getElementById("appLayout");
  if (!layout) return;

  const isCollapsed = layout.classList.toggle("sidebar-collapsed");
  document.body.classList.toggle("sidebar-is-collapsed", isCollapsed);

  const toggleBtn = document.getElementById("btnToggleSidebar");
  if (toggleBtn) {
    toggleBtn.classList.toggle("active-collapsed", isCollapsed);
  }

  // Persist per-user preference (§5: "Toggle state persists per-user in
  // localStorage") so the sidebar stays collapsed/expanded across reloads.
  try {
    localStorage.setItem("veridex_sidebar_collapsed", isCollapsed ? "1" : "0");
  } catch (e) { /* localStorage unavailable — non-fatal */ }

  if (isCollapsed) {
    showToast("🖥️ Sidebar Collapsed", "info");
  } else {
    showToast("Sidebar Expanded", "info");
  }
}

function restoreSidebarCollapsedState() {
  const layout = document.getElementById("appLayout");
  const toggleBtn = document.getElementById("btnToggleSidebar");
  if (!layout) return;

  let wasCollapsed = false;
  try {
    wasCollapsed = localStorage.getItem("veridex_sidebar_collapsed") === "1";
  } catch (e) { /* localStorage unavailable — default to expanded */ }

  if (wasCollapsed) {
    layout.classList.add("sidebar-collapsed");
    document.body.classList.add("sidebar-is-collapsed");
    if (toggleBtn) toggleBtn.classList.add("active-collapsed");
  }
}

function toggleBrowserFullscreen() {
  const icon = document.getElementById("fullscreenIcon");
  const label = document.getElementById("fullscreenLabel");

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      if (icon) icon.className = "ph ph-arrows-in";
      if (label) label.textContent = "Exit Fullscreen";
      showToast("🖥️ Browser Full-Screen Mode Activated (Press Esc to Exit)", "success");
    }).catch(err => {
      showToast(`Fullscreen request error: ${err.message}`, "warning");
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        if (icon) icon.className = "ph ph-arrows-out";
        if (label) label.textContent = "Fullscreen";
        showToast("Exited Full-Screen Mode", "info");
      });
    }
  }
}

// Sync button if user exits fullscreen with ESC or F11
document.addEventListener("fullscreenchange", () => {
  const icon = document.getElementById("fullscreenIcon");
  const label = document.getElementById("fullscreenLabel");
  if (document.fullscreenElement) {
    if (icon) icon.className = "ph ph-arrows-in";
    if (label) label.textContent = "Exit Fullscreen";
  } else {
    if (icon) icon.className = "ph ph-arrows-out";
    if (label) label.textContent = "Fullscreen";
  }
});

// Keyboard shortcut: Ctrl + B toggles sidebar
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey && e.key.toLowerCase() === "b") || (e.altKey && e.key.toLowerCase() === "s")) {
    e.preventDefault();
    toggleSidebar();
  }
});

// ============================================================================
// 4. TOP-LEVEL PAGE NAVIGATION & WORKFLOW STEPPER ENGINE
// ============================================================================

/**
 * Switch to Page 1: Submission Intake Hub
 */
/**
 * Hides every top-level .page-view container and clears sidebar-nav active
 * state. Called at the start of each showXPage() function so new pages
 * added later don't need every older function patched individually.
 */
/**
 * Renders the breadcrumb trail (§10.11): Module › Section › Page › Record.
 * Max 4 visible levels — beyond that, middle segments collapse into a
 * "…" with a title tooltip showing the full path. Rightmost crumb is
 * always the current page (non-clickable); all others are links.
 * items: [{ label, onClick? }]
 */
function setBreadcrumb(items) {
  const list = document.getElementById("breadcrumbList");
  if (!list || !items || items.length === 0) return;

  let displayItems = items;
  if (items.length > 4) {
    const collapsedLabels = items.slice(1, -1).map(i => i.label).join(" › ");
    displayItems = [items[0], { label: "…", ellipsis: true, fullPath: collapsedLabels }, items[items.length - 1]];
  }

  const html = displayItems.map((item, idx) => {
    const isLast = idx === displayItems.length - 1;
    const sep = idx > 0 ? `<li class="breadcrumb-sep" aria-hidden="true">›</li>` : "";

    if (item.ellipsis) {
      return `${sep}<li class="breadcrumb-item breadcrumb-ellipsis" title="${item.fullPath}">…</li>`;
    }
    if (isLast) {
      return `${sep}<li class="breadcrumb-item breadcrumb-current" aria-current="page">${item.label}</li>`;
    }
    const clickAttr = item.onClick ? ` onclick="${item.onClick}"` : "";
    return `${sep}<li class="breadcrumb-item breadcrumb-link" tabindex="0"${clickAttr}>${item.label}</li>`;
  }).join("");

  list.innerHTML = html;
}

/**
 * Typed-Confirmation Modal (§10.16) — for destructive/irreversible actions.
 * Requires the user to type an exact confirmation string (e.g. the record
 * ID) before the Confirm button activates. Call openTypedConfirmModal with
 * a config; onConfirm runs only after the typed text matches exactly.
 */
let pendingTypedConfirm = null;

function openTypedConfirmModal({ title, message, expectedText, onConfirm }) {
  const modal = document.getElementById("typedConfirmModal");
  const titleEl = document.getElementById("typedConfirmTitle");
  const messageEl = document.getElementById("typedConfirmMessage");
  const expectedEl = document.getElementById("typedConfirmExpectedText");
  const inputEl = document.getElementById("typedConfirmInput");
  const submitBtn = document.getElementById("typedConfirmSubmitBtn");
  if (!modal) return;

  pendingTypedConfirm = { expectedText, onConfirm };

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;
  if (expectedEl) expectedEl.textContent = expectedText;
  if (inputEl) inputEl.value = "";
  if (submitBtn) submitBtn.disabled = true;

  modal.style.display = "flex";
  if (inputEl) setTimeout(() => inputEl.focus(), 50);
}

function closeTypedConfirmModal() {
  const modal = document.getElementById("typedConfirmModal");
  if (modal) modal.style.display = "none";
  pendingTypedConfirm = null;
}

function validateTypedConfirmInput() {
  const inputEl = document.getElementById("typedConfirmInput");
  const submitBtn = document.getElementById("typedConfirmSubmitBtn");
  if (!inputEl || !submitBtn || !pendingTypedConfirm) return;
  submitBtn.disabled = inputEl.value !== pendingTypedConfirm.expectedText;
}

function submitTypedConfirm() {
  if (!pendingTypedConfirm) return;
  const { onConfirm } = pendingTypedConfirm;
  closeTypedConfirmModal();
  if (typeof onConfirm === "function") onConfirm();
}

function confirmArchiveSubmission(subId) {
  openTypedConfirmModal({
    title: "Archive Submission",
    message: `Archiving ${subId} moves it out of the active pipeline. It will remain fully accessible in Archived Records for audit purposes, but this action cannot be undone from here.`,
    expectedText: subId,
    onConfirm: () => archiveSubmission(subId)
  });
}

function confirmDeleteSubmissionDocument(subId, docIdx) {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId);
  const docName = sub && sub.docs && sub.docs[docIdx] ? sub.docs[docIdx].name : "this document";
  openTypedConfirmModal({
    title: "Delete Document",
    message: `Deleting "${docName}" from ${subId} cannot be undone.`,
    expectedText: subId,
    onConfirm: () => deleteSubmissionDocument(subId, docIdx)
  });
}

function resetAllTopLevelPages() {
  document.querySelectorAll(".page-view").forEach(p => {
    p.style.display = "none";
    p.classList.remove("active");
  });
  document.querySelectorAll(".sidebar-nav-item").forEach(n => n.classList.remove("active"));
}

function showIntakePage() {
  currentPage = "intake";
  currentScreenId = "screen-1";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex" }, { label: "Submission Intake" }]);

  // 1. Toggle Page Views
  const intakePage = document.getElementById("intakePageView");
  const workflowPage = document.getElementById("workflowPageView");
  const archivePage = document.getElementById("archivePageView");

  if (intakePage) { intakePage.style.display = "block"; intakePage.classList.add("active"); }
  if (workflowPage) { workflowPage.style.display = "none"; workflowPage.classList.remove("active"); }
  if (archivePage) { archivePage.style.display = "none"; archivePage.classList.remove("active"); }

  // 2. Ensure Screen 1 is active
  document.querySelectorAll(".screen-view").forEach(s => s.classList.remove("active"));
  const s1 = document.getElementById("screen-1");
  if (s1) s1.classList.add("active");

  // 3. Update Nav Items & Header Workflow Button
  const navIntake = document.getElementById("navItemIntake");
  const navArchive = document.getElementById("navItemArchive");
  const navVersions = document.getElementById("navItemQuoteVersions");
  const btnHw = document.getElementById("headerCaseWorkflowBtn");

  if (navIntake) navIntake.classList.add("active");
  if (navArchive) navArchive.classList.remove("active");
  if (navVersions) navVersions.classList.remove("active");
  if (btnHw) btnHw.classList.remove("active");

  const versionsPage = document.getElementById("quoteVersionsPageView");
  if (versionsPage) { versionsPage.style.display = "none"; versionsPage.classList.remove("active"); }

  // 4. Hide Bottom Workflow Footer on Intake Page
  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  // 5. Update Active Account Widget in Sidebar & Header
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (sub) updateActiveCaseHeaders(sub);

  // 6. Refresh Table
  renderSubmissionsTable();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Switch to Page 2: Active Case Workflow (7 Steps)
 */
function showWorkflowPage(stepNum = 1) {
  currentPage = "workflow";
  resetAllTopLevelPages();
  const stepObj = WORKFLOW_STEPS.find(s => s.step === stepNum);
  setBreadcrumb([
    { label: "VeriDex", onClick: "showIntakePage()" },
    { label: "Active Case Workflow", onClick: `goToWorkflowStep(1)` },
    { label: stepObj ? stepObj.title : `Step ${stepNum}` }
  ]);

  // 1. Toggle Page Views
  const intakePage = document.getElementById("intakePageView");
  const workflowPage = document.getElementById("workflowPageView");
  const archivePage = document.getElementById("archivePageView");
  const versionsPage = document.getElementById("quoteVersionsPageView");

  if (intakePage) { intakePage.style.display = "none"; intakePage.classList.remove("active"); }
  if (workflowPage) { workflowPage.style.display = "block"; workflowPage.classList.add("active"); }
  if (archivePage) { archivePage.style.display = "none"; archivePage.classList.remove("active"); }
  if (versionsPage) { versionsPage.style.display = "none"; versionsPage.classList.remove("active"); }

  // 2. Update Nav Items & Header Workflow Button
  const navIntake = document.getElementById("navItemIntake");
  const navArchive = document.getElementById("navItemArchive");
  const navVersions = document.getElementById("navItemQuoteVersions");
  const btnHw = document.getElementById("headerCaseWorkflowBtn");

  if (navIntake) navIntake.classList.remove("active");
  if (navArchive) navArchive.classList.remove("active");
  if (navVersions) navVersions.classList.remove("active");
  if (btnHw) btnHw.classList.add("active");

  // 3. Navigate to requested workflow step
  goToWorkflowStep(stepNum);
}

/**
 * Switch to Page 3: Dedicated Decline Archive & Audit Logs
 */
// ============================================================================
// AUDIT LOG ARCHIVAL POLICY (Manager/Admin configurable retention rules)
// ============================================================================
let ARCHIVAL_POLICY = {
  triggerStatus: "retired",      // 'declined' | 'retired' | 'bound_closed'
  retentionDays: 90,
  requireApproval: true,
  lastUpdatedBy: "David Chen (Senior Underwriter)",
  lastUpdatedAt: "2026-08-20 09:15",
  changeLog: [
    { by: "David Chen (Senior Underwriter)", at: "2026-08-20 09:15", summary: "Initial policy: Retired records archived after 90 days, manager approval required." }
  ]
};

const ARCHIVAL_TRIGGER_LABELS = {
  declined: "Declined / Terminated",
  retired: "Retired",
  bound_closed: "Bound & Closed"
};

function renderArchivalPolicySummary() {
  const el = document.getElementById("archivalPolicySummaryText");
  if (el) {
    el.textContent = `Current policy: records reaching "${ARCHIVAL_TRIGGER_LABELS[ARCHIVAL_POLICY.triggerStatus]}" status are archived after ${ARCHIVAL_POLICY.retentionDays} day(s). ${ARCHIVAL_POLICY.requireApproval ? "Manager approval is required before archiving." : "Archiving happens automatically without manual approval."} Last updated by ${ARCHIVAL_POLICY.lastUpdatedBy} on ${ARCHIVAL_POLICY.lastUpdatedAt}.`;
  }
  const triggerSelect = document.getElementById("archivalPolicyTriggerStatus");
  const daysInput = document.getElementById("archivalPolicyRetentionDays");
  const approvalCheckbox = document.getElementById("archivalPolicyRequireApproval");
  if (triggerSelect) triggerSelect.value = ARCHIVAL_POLICY.triggerStatus;
  if (daysInput) daysInput.value = ARCHIVAL_POLICY.retentionDays;
  if (approvalCheckbox) approvalCheckbox.checked = ARCHIVAL_POLICY.requireApproval;

  const logEl = document.getElementById("archivalPolicyAuditTrail");
  if (logEl) {
    const rows = ARCHIVAL_POLICY.changeLog.slice().reverse().slice(0, 5).map(c =>
      `<div>› ${c.at} — <strong>${c.by}</strong>: ${c.summary}</div>`
    ).join("");
    logEl.innerHTML = `<strong>Policy Change History:</strong>${rows}`;
  }
}

function saveArchivalPolicy() {
  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;

  if (!hasPermission("archival", "edit")) {
    denyPermission("archival", "edit");
    return;
  }

  const triggerStatus = document.getElementById("archivalPolicyTriggerStatus").value;
  const retentionDays = parseInt(document.getElementById("archivalPolicyRetentionDays").value, 10) || 90;
  const requireApproval = document.getElementById("archivalPolicyRequireApproval").checked;

  ARCHIVAL_POLICY.triggerStatus = triggerStatus;
  ARCHIVAL_POLICY.retentionDays = retentionDays;
  ARCHIVAL_POLICY.requireApproval = requireApproval;
  ARCHIVAL_POLICY.lastUpdatedBy = `${roleConfig.name} (${roleConfig.title})`;
  ARCHIVAL_POLICY.lastUpdatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
  ARCHIVAL_POLICY.changeLog.push({
    by: ARCHIVAL_POLICY.lastUpdatedBy,
    at: ARCHIVAL_POLICY.lastUpdatedAt,
    summary: `Set to archive "${ARCHIVAL_TRIGGER_LABELS[triggerStatus]}" records after ${retentionDays} day(s); approval ${requireApproval ? "required" : "not required"}.`
  });

  renderArchivalPolicySummary();
  renderArchivalEligibilityQueue();
  showToast(`✅ Archival policy saved by ${roleConfig.name}. Archived records remain fully accessible for audit.`, "success");
}

// ============================================================================
// DYNAMIC ARCHIVAL ELIGIBILITY — computed live from SUBMISSIONS_DATASET
// against the currently configured ARCHIVAL_POLICY, not a static list.
// ============================================================================
function computeArchivalEligibility() {
  const nowMs = Date.now();
  const eligibleNow = [];
  const notYetEligible = [];
  const alreadyArchived = [];

  SUBMISSIONS_DATASET.forEach(sub => {
    if (sub.archived) {
      alreadyArchived.push(sub);
      return;
    }
    if (!sub.lifecycleStatus || sub.lifecycleStatus !== ARCHIVAL_POLICY.triggerStatus) return;

    const daysSinceStatus = (nowMs - (sub.lifecycleStatusAt || nowMs)) / (24 * 60 * 60 * 1000);
    if (daysSinceStatus >= ARCHIVAL_POLICY.retentionDays) {
      eligibleNow.push({ sub, daysSinceStatus: Math.floor(daysSinceStatus) });
    } else {
      notYetEligible.push({ sub, daysSinceStatus: Math.floor(daysSinceStatus), daysRemaining: Math.ceil(ARCHIVAL_POLICY.retentionDays - daysSinceStatus) });
    }
  });

  return { eligibleNow, notYetEligible, alreadyArchived };
}

function renderArchivalEligibilityQueue() {
  const container = document.getElementById("archivalEligibilityQueue");
  const notice = document.getElementById("archivalEligibilityAuthNotice");
  if (!container) return;

  const isAdmin = currentUserRole === "admin";
  if (notice) notice.style.display = isAdmin ? "none" : "flex";
  if (!isAdmin) {
    container.innerHTML = "";
    return;
  }

  const { eligibleNow, notYetEligible, alreadyArchived } = computeArchivalEligibility();
  const triggerLabel = ARCHIVAL_TRIGGER_LABELS[ARCHIVAL_POLICY.triggerStatus];

  const eligibleRows = eligibleNow.map(({ sub, daysSinceStatus }) => `
    <tr>
      <td><code class="font-mono">${sub.id}</code></td>
      <td>${sub.insured}</td>
      <td>${sub.lobName}</td>
      <td><span class="badge badge-warning">${triggerLabel}</span></td>
      <td>${daysSinceStatus} days ago</td>
      <td>
        <button class="btn btn-xs btn-primary" onclick="confirmArchiveSubmission('${sub.id}')">
          <i class="ph ph-archive"></i> ${ARCHIVAL_POLICY.requireApproval ? "Approve & Archive" : "Archive Now"}
        </button>
      </td>
    </tr>`).join("");

  const pendingRows = notYetEligible.map(({ sub, daysSinceStatus, daysRemaining }) => `
    <tr>
      <td><code class="font-mono">${sub.id}</code></td>
      <td>${sub.insured}</td>
      <td>${sub.lobName}</td>
      <td><span class="badge badge-info">${triggerLabel}</span></td>
      <td>${daysSinceStatus} days ago</td>
      <td><span class="text-xs text-muted">${daysRemaining} day(s) until eligible</span></td>
    </tr>`).join("");

  const archivedRows = alreadyArchived.map(sub => `
    <tr>
      <td><code class="font-mono">${sub.id}</code></td>
      <td>${sub.insured}</td>
      <td>${sub.lobName}</td>
      <td>${new Date(sub.archivedAt).toISOString().slice(0, 10)}</td>
      <td>${sub.archivedBy || "—"}</td>
      <td><button class="btn btn-xs btn-outline" onclick="openCaseAtCurrentStep('${sub.id}')"><i class="ph ph-eye"></i> View</button></td>
    </tr>`).join("");

  container.innerHTML = `
    <div class="card mt-3">
      <div class="card-header">
        <h3><i class="ph ph-tray"></i> Eligible for Archival Now</h3>
        <span class="badge ${eligibleNow.length > 0 ? 'badge-warning' : 'badge-success'}">${eligibleNow.length} record(s)</span>
      </div>
      <div class="card-body p-0">
        ${eligibleNow.length === 0
          ? `<div class="p-3 text-muted text-sm">No records currently meet the policy ("${triggerLabel}" + ${ARCHIVAL_POLICY.retentionDays}+ days). This list recomputes automatically whenever the policy above is changed.</div>`
          : `<table class="data-table">
              <thead><tr><th>Submission</th><th>Customer</th><th>LOB</th><th>Status</th><th>Age</th><th>Action</th></tr></thead>
              <tbody>${eligibleRows}</tbody>
            </table>`}
      </div>
    </div>

    ${notYetEligible.length > 0 ? `
    <div class="card mt-3">
      <div class="card-header">
        <h3><i class="ph ph-hourglass-medium"></i> Approaching Eligibility</h3>
        <span class="badge badge-info">${notYetEligible.length} record(s)</span>
      </div>
      <div class="card-body p-0">
        <table class="data-table">
          <thead><tr><th>Submission</th><th>Customer</th><th>LOB</th><th>Status</th><th>Age</th><th>Time Remaining</th></tr></thead>
          <tbody>${pendingRows}</tbody>
        </table>
      </div>
    </div>` : ''}

    <div class="card mt-3">
      <div class="card-header">
        <h3><i class="ph ph-archive"></i> Archived Records</h3>
        <span class="badge badge-success">${alreadyArchived.length} record(s) — always accessible</span>
      </div>
      <div class="card-body p-0">
        ${alreadyArchived.length === 0
          ? `<div class="p-3 text-muted text-sm">No records archived yet.</div>`
          : `<table class="data-table">
              <thead><tr><th>Submission</th><th>Customer</th><th>LOB</th><th>Archived On</th><th>Archived By</th><th></th></tr></thead>
              <tbody>${archivedRows}</tbody>
            </table>`}
      </div>
    </div>
  `;
}

function archiveSubmission(subId) {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId);
  if (!sub) return;

  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;

  if (!hasPermission("archival", "archive")) {
    denyPermission("archival", "archive");
    return;
  }
  if (ARCHIVAL_POLICY.requireApproval && !hasPermission("archival", "approve") && !hasPermission("archival", "edit")) {
    showToast("⛔ This policy requires manager approval to archive. Switch to an authorized persona to approve.", "danger");
    return;
  }

  sub.archived = true;
  sub.archivedAt = Date.now();
  sub.archivedBy = `${roleConfig.name} (${roleConfig.title})`;

  const nowStamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  if (!sub.decisionLog) sub.decisionLog = [];
  sub.decisionLog.push({
    step: sub.currentStep || 7,
    decision: "archived",
    by: sub.archivedBy,
    at: nowStamp,
    notes: `Archived under retention policy "${ARCHIVAL_TRIGGER_LABELS[ARCHIVAL_POLICY.triggerStatus]}" (${ARCHIVAL_POLICY.retentionDays} day retention). Record remains fully accessible.`
  });

  showToast(`✅ ${sub.id} archived by ${roleConfig.name}. Record remains fully accessible in the Archived Records list.`, "success");
  renderArchivalEligibilityQueue();
  refreshAuditLogIfVisible();
}

function showArchivePage() {
  currentPage = "archive";
  currentScreenId = "screen-9";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex", onClick: "showIntakePage()" }, { label: "Archive & Audit" }]);

  const archivePage = document.getElementById("archivePageView");
  if (archivePage) { archivePage.style.display = "block"; archivePage.classList.add("active"); }

  document.querySelectorAll(".screen-view").forEach(s => s.classList.remove("active"));
  const s9 = document.getElementById("screen-9");
  if (s9) s9.classList.add("active");

  const navArchive = document.getElementById("navItemArchive");
  if (navArchive) navArchive.classList.add("active");

  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  // Archive module (policy config, eligibility queue, archived records) is
  // restricted to the Admin persona only.
  const isAdmin = currentUserRole === "admin";
  const contentEl = document.getElementById("archivePageContent");
  const authNoticeEl = document.getElementById("archivePageAuthNotice");
  if (contentEl) contentEl.style.display = isAdmin ? "block" : "none";
  if (authNoticeEl) authNoticeEl.style.display = isAdmin ? "none" : "flex";

  if (isAdmin) {
    renderArchivalPolicySummary();
    renderArchivalEligibilityQueue();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Switch to the Decline Center — submission exit paths and the
 * declined/terminated submissions audit log. Visible to every role
 * (unlike Archive, which is Admin-only).
 */
function showDeclinePage() {
  currentPage = "decline";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex", onClick: "showIntakePage()" }, { label: "Decline Center" }]);

  const declinePage = document.getElementById("declinePageView");
  if (declinePage) { declinePage.style.display = "block"; declinePage.classList.add("active"); }

  const navDecline = document.getElementById("navItemDecline");
  if (navDecline) navDecline.classList.add("active");

  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  renderDeclineCenter();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Switch to Page 4: Quote Versioning, Revision Ledger & Actuarial Diff
 */
function showQuoteVersionsPage() {
  currentPage = "quote-versions";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex", onClick: "showIntakePage()" }, { label: "Quote Versioning" }]);

  // 1. Toggle Page Views
  const intakePage = document.getElementById("intakePageView");
  const workflowPage = document.getElementById("workflowPageView");
  const archivePage = document.getElementById("archivePageView");
  const versionsPage = document.getElementById("quoteVersionsPageView");

  if (intakePage) { intakePage.style.display = "none"; intakePage.classList.remove("active"); }
  if (workflowPage) { workflowPage.style.display = "none"; workflowPage.classList.remove("active"); }
  if (archivePage) { archivePage.style.display = "none"; archivePage.classList.remove("active"); }
  if (versionsPage) { versionsPage.style.display = "block"; versionsPage.classList.add("active"); }

  // 2. Update Nav Items & Header Workflow Button
  const navIntake = document.getElementById("navItemIntake");
  const navArchive = document.getElementById("navItemArchive");
  const navVersions = document.getElementById("navItemQuoteVersions");
  const btnHw = document.getElementById("headerCaseWorkflowBtn");

  if (navIntake) navIntake.classList.remove("active");
  if (navArchive) navArchive.classList.remove("active");
  if (navVersions) navVersions.classList.add("active");
  if (btnHw) btnHw.classList.remove("active");

  // 3. Hide Bottom Workflow Footer
  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  // 4. Render Table
  renderQuoteVersionsLedger();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================================
// FEATURE #1: TEAM PROCESS TRACKING (Admin/Manager visibility)
// ============================================================================

function showTeamActivityPage() {
  currentPage = "team-activity";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex", onClick: "showIntakePage()" }, { label: "Admin" }, { label: "Team Activity" }]);

  const page = document.getElementById("teamActivityPageView");
  if (page) { page.style.display = "block"; page.classList.add("active"); }

  const nav = document.getElementById("navItemTeamActivity");
  if (nav) nav.classList.add("active");

  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  const notice = document.getElementById("teamActivityAuthNotice");
  const boardEl = document.getElementById("teamActivityBoard");
  const chartEl = document.getElementById("teamActivityMonthlyChart");
  const isAdmin = currentUserRole === "admin";
  if (notice) notice.style.display = isAdmin ? "none" : "flex";
  if (boardEl) boardEl.style.display = isAdmin ? "block" : "none";
  if (chartEl) chartEl.style.display = isAdmin ? "block" : "none";

  if (!isAdmin) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  renderTeamActivityMonthlyChart();
  renderTeamActivityBoard();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function computeSubmissionActivityFlags(sub) {
  const stepObj = WORKFLOW_STEPS.find(s => s.step === (sub.currentStep || 1));
  const completed = (sub.completedSteps || []).length;
  const totalSteps = WORKFLOW_STEPS.length;
  const ageMs = Date.now() - (sub.receivedTimestamp || Date.now());
  const ageHours = ageMs / (1000 * 60 * 60);

  // Delayed heuristic: P1/P2 priority cases sitting for a long time without
  // progressing past the first couple of steps are flagged as at-risk.
  let isDelayed = false;
  let delayReason = "";
  if ((sub.priority === "P1" || sub.priority === "P2") && ageHours > 24 && (sub.currentStep || 1) <= 2) {
    isDelayed = true;
    delayReason = `${sub.priority} priority, received ${Math.round(ageHours)}h ago, still at "${stepObj ? stepObj.shortTitle : 'Intake'}"`;
  } else if (sub.exposureVal > sub.authorityLimit && (sub.currentStep || 1) < 5) {
    isDelayed = true;
    delayReason = `Exceeds underwriter authority — awaiting escalation/referral before Step 5`;
  }

  return {
    stepTitle: stepObj ? stepObj.title : "Doc Ingestion",
    completed,
    totalSteps,
    isDelayed,
    delayReason
  };
}

// ============================================================================
// MONTHLY PIPELINE OUTCOME CHART — Quote Generated vs Issued vs
// Declined/Missing-Info (submissions that never reached quote generation)
// ============================================================================
/**
 * Re-renders the Team Activity chart + board only if that page is currently
 * open, so the graphs always map live data without unnecessary work when
 * the admin isn't looking at them. Call this after any action that could
 * change a submission's pipeline-outcome category or workload.
 */
function refreshTeamActivityIfVisible() {
  if (currentPage === "team-activity" && currentUserRole === "admin") {
    renderTeamActivityMonthlyChart();
    renderTeamActivityBoard();
  }
}

// ============================================================================
// DECLINE CENTER — real decline action, wired from the Underwriting
// Workbench, that feeds the Decline Center's audit log dynamically.
// ============================================================================
const DECLINE_TRIGGER_BADGE = {
  "Duplicate FEIN": "badge-warning",
  "Appetite Knockout": "badge-danger",
  "Senior UW Decline": "badge-danger",
  "Other": "badge-warning"
};

// Seeded with the 3 original historical demo entries; new declines are
// unshifted onto the front (newest first) as they happen live.
let DECLINE_LOG = [
  { subId: "SUB-48199-OH", insured: "Midwest Hazmat Haulers LLC", lob: "Trucking", triggerPoint: "Appetite Knockout", reason: "Class 1 Explosives transport exceeds carrier filing guidelines", at: "2026-08-25 14:10" },
  { subId: "SUB-48182-PX", insured: "Meridian Distribution Group", lob: "Commercial Property", triggerPoint: "Duplicate FEIN", reason: "Conflicting submission already locked by Aon Risk Services", at: "2026-08-25 11:35" },
  { subId: "SUB-48110-CA", insured: "Pacific Chemical Solutions", lob: "GL Casualty", triggerPoint: "Senior UW Decline", reason: "Prior 3-year loss ratio exceeds 140% with open environmental claim", at: "2026-08-24 16:50" }
];

// Roles authorized to fix a duplicate-FEIN decline: Senior Underwriter and
// above (Senior UW, CUO, Binding Ops, Admin) — Junior/Assistant/Auditor
// cannot resolve this.
const FEIN_FIX_AUTHORIZED_ROLES = ["senior_uw", "senior", "binder", "admin"];

/**
 * Generates a new unique FEIN for a submission using the platform's
 * established convention: a shared parent-account base prefix, with the
 * last 2 characters of the submission ID concatenated on — the same
 * approach used to originally de-duplicate the Apex Freight Holdings
 * account's FEINs (e.g. ...TX / ...PX / ...OH).
 */
function generateUniqueFeinForSubmission(sub) {
  const basePrefix = "81-440000";
  const suffix = sub.id.slice(-2).toUpperCase();
  return basePrefix + suffix;
}

/**
 * Reflects the submission's actual duplicate-FEIN clearance state on
 * Step 6 (FEIN Clearance & Duplicate Detection) — this previously never
 * changed regardless of what happened to the submission.
 */
function renderFeinClearanceStatus(sub) {
  const badge = document.getElementById("feinStatusBadge");
  const activeCount = document.getElementById("activeSubCount");
  const clearanceAction = document.getElementById("clearanceActionResult");
  if (!badge || !activeCount || !clearanceAction) return;

  const wasFixed = DECLINE_LOG.some(e => e.subId === sub.id && e.triggerPoint === "Duplicate FEIN" && e.fixed);
  const isDuplicateDeclined = sub.lifecycleStatus === "declined" && sub.declineTriggerPoint === "Duplicate FEIN" && !wasFixed;

  if (isDuplicateDeclined) {
    badge.className = "badge badge-danger";
    badge.innerHTML = `<i class="ph ph-warning"></i> Duplicate FEIN Detected`;
    activeCount.className = "val font-bold text-danger";
    activeCount.textContent = "1 Conflicting (Broker of Record Lock)";
    clearanceAction.className = "val badge badge-danger";
    clearanceAction.textContent = "Failed Clearance → Routed to Decline Center";
  } else if (wasFixed) {
    badge.className = "badge badge-success";
    badge.innerHTML = `<i class="ph ph-check-circle"></i> Unique Entity Cleared (Resolved)`;
    activeCount.className = "val font-bold text-success";
    activeCount.textContent = `0 Conflicting (FEIN reassigned: ${sub.fein})`;
    clearanceAction.className = "val badge badge-success";
    clearanceAction.textContent = "Passed Clearance → Proceed to Appetite Evaluation";
  } else {
    badge.className = "badge badge-success";
    badge.innerHTML = `<i class="ph ph-check-circle"></i> Unique Entity Cleared`;
    activeCount.className = "val font-bold text-success";
    activeCount.textContent = "0 Conflicting (Unique Registered Entity)";
    clearanceAction.className = "val badge badge-success";
    clearanceAction.textContent = "Passed Clearance → Proceed to Appetite Evaluation";
  }
}

function renderDeclineCenter() {
  const tbody = document.getElementById("exitAuditTable");
  if (!tbody) return;

  const canFix = FEIN_FIX_AUTHORIZED_ROLES.includes(currentUserRole);

  if (DECLINE_LOG.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted text-sm" style="padding:20px;">No declined or terminated submissions logged yet.</td></tr>`;
  } else {
    tbody.innerHTML = DECLINE_LOG.map((entry, idx) => {
      let actionCell = `<span class="text-xs text-muted">—</span>`;
      if (entry.triggerPoint === "Duplicate FEIN") {
        if (entry.fixed) {
          actionCell = `<span class="badge badge-success" title="New FEIN: ${entry.newFein}"><i class="ph ph-check"></i> Fixed</span>`;
        } else if (canFix) {
          actionCell = `<button class="btn btn-xs btn-primary" onclick="fixDuplicateFein(${idx})"><i class="ph ph-wrench"></i> Fix</button>`;
        } else {
          actionCell = `<span class="text-xs text-muted" title="Senior Underwriter or higher authority required">🔒 Restricted — Senior UW+ required</span>`;
        }
      }
      return `
      <tr>
        <td><code>${entry.subId}</code></td>
        <td>${entry.insured}</td>
        <td>${entry.lob}</td>
        <td><span class="badge ${DECLINE_TRIGGER_BADGE[entry.triggerPoint] || 'badge-danger'}">${entry.triggerPoint}</span></td>
        <td>${entry.reason}</td>
        <td>${entry.at}</td>
        <td>${actionCell}</td>
      </tr>`;
    }).join("");
  }

  // Live per-category counts on the 3 exit-path cards, plus overall total —
  // computed from DECLINE_LOG, not hardcoded.
  const countByTrigger = { "Duplicate FEIN": 0, "Appetite Knockout": 0, "Senior UW Decline": 0 };
  DECLINE_LOG.forEach(e => {
    if (countByTrigger.hasOwnProperty(e.triggerPoint)) countByTrigger[e.triggerPoint]++;
  });

  const dupEl = document.getElementById("exitCountDuplicateFein");
  const appEl = document.getElementById("exitCountAppetiteKnockout");
  const senEl = document.getElementById("exitCountSeniorDecline");
  const totalEl = document.getElementById("declineTotalBadge");

  if (dupEl) dupEl.textContent = `${countByTrigger["Duplicate FEIN"]} Record${countByTrigger["Duplicate FEIN"] !== 1 ? 's' : ''}`;
  if (appEl) appEl.textContent = `${countByTrigger["Appetite Knockout"]} Record${countByTrigger["Appetite Knockout"] !== 1 ? 's' : ''}`;
  if (senEl) senEl.textContent = `${countByTrigger["Senior UW Decline"]} Record${countByTrigger["Senior UW Decline"] !== 1 ? 's' : ''}`;
  if (totalEl) totalEl.textContent = `${DECLINE_LOG.length} Record${DECLINE_LOG.length !== 1 ? 's' : ''} Logged`;

  const badgeCount = document.getElementById("sidebarDeclineCount");
  if (badgeCount) badgeCount.textContent = DECLINE_LOG.length;
}

function fixDuplicateFein(logIndex) {
  if (!FEIN_FIX_AUTHORIZED_ROLES.includes(currentUserRole)) {
    showToast("⛔ Only Senior Underwriter or higher authority can fix a duplicate FEIN.", "danger");
    return;
  }

  const entry = DECLINE_LOG[logIndex];
  if (!entry || entry.triggerPoint !== "Duplicate FEIN" || entry.fixed) return;

  const sub = SUBMISSIONS_DATASET.find(s => s.id === entry.subId);
  if (!sub) {
    showToast("⛔ Could not locate the submission record to fix.", "danger");
    return;
  }

  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  const newFein = generateUniqueFeinForSubmission(sub);
  const nowStamp = new Date().toISOString().slice(0, 16).replace("T", " ");

  sub.fein = newFein;

  entry.fixed = true;
  entry.newFein = newFein;
  entry.fixedBy = `${roleConfig.name} (${roleConfig.title})`;
  entry.fixedAt = nowStamp;

  if (!sub.decisionLog) sub.decisionLog = [];
  sub.decisionLog.push({
    step: sub.currentStep || 2,
    decision: "fein_fixed",
    by: entry.fixedBy,
    at: nowStamp,
    notes: `Duplicate FEIN resolved. New FEIN assigned: ${newFein}.`
  });

  showToast(`✅ New FEIN generated for ${sub.id}: ${newFein}. Duplicate resolved by ${roleConfig.name}. Updated everywhere this submission is referenced.`, "success");

  renderDeclineCenter();
  renderSubmissionsTable();

  // Refresh every other live view of this submission's FEIN immediately,
  // instead of waiting for the next navigation/re-render to pick it up.
  updateActiveCaseHeaders(sub);
  const feinNumEl = document.getElementById("checkFeinNumber");
  if (feinNumEl) feinNumEl.textContent = sub.fein;
  renderFeinClearanceStatus(sub);

  // If the underwriter is viewing this submission's Step 6 workbench right
  // now, do a full refresh of that screen's data-bound fields too.
  if (currentPage === "workflow" && activeSubmissionId === sub.id) {
    renderAllDownstreamScreens(sub);
  }
}

let declineSubmissionTargetId = null;

function openDeclineSubmissionModal(subId) {
  if (!hasPermission("workflow", "approve")) {
    denyPermission("workflow", "approve");
    return;
  }

  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId);
  if (!sub) return;

  declineSubmissionTargetId = subId;

  document.getElementById("declineSubmissionIdLabel").innerHTML = `<strong>Submission:</strong> <code>${sub.id}</code> — ${sub.insured || "N/A"}`;
  document.getElementById("declineTriggerPoint").value = "Appetite Knockout";
  document.getElementById("declineReasonText").value = "";
  document.getElementById("declineConfirmExpected").textContent = subId;
  document.getElementById("declineConfirmInput").value = "";
  document.getElementById("declineSubmitBtn").disabled = true;

  const modal = document.getElementById("declineSubmissionModal");
  if (modal) modal.style.display = "flex";
}

function closeDeclineSubmissionModal() {
  const modal = document.getElementById("declineSubmissionModal");
  if (modal) modal.style.display = "none";
  declineSubmissionTargetId = null;
}

function validateDeclineConfirmInput() {
  const input = document.getElementById("declineConfirmInput");
  const btn = document.getElementById("declineSubmitBtn");
  if (!input || !btn || !declineSubmissionTargetId) return;
  btn.disabled = input.value !== declineSubmissionTargetId;
}

function submitDeclineSubmission() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === declineSubmissionTargetId);
  if (!sub) return;

  if (!hasPermission("workflow", "approve")) {
    denyPermission("workflow", "approve");
    return;
  }

  const triggerPoint = document.getElementById("declineTriggerPoint").value;
  const reason = document.getElementById("declineReasonText").value.trim();
  if (!reason) {
    showToast("⛔ A reason is required to decline a submission.", "danger");
    return;
  }

  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  const nowStamp = new Date().toISOString().slice(0, 16).replace("T", " ");

  // Mark the submission itself as declined (this also feeds the Team
  // Activity "Declined / Missing Info" chart bucket automatically, since
  // categorizeSubmissionOutcome() checks lifecycleStatus === "declined").
  sub.lifecycleStatus = "declined";
  sub.lifecycleStatusAt = Date.now();
  sub.declinedBy = `${roleConfig.name} (${roleConfig.title})`;
  sub.declineReason = reason;
  sub.declineTriggerPoint = triggerPoint;

  if (triggerPoint === "Duplicate FEIN") {
    // Duplicate FEIN declines route directly to Senior Underwriter review
    // — not left as a dead decline, since a corrected FEIN needs senior
    // sign-off before the submission can proceed.
    sub.statusText = "Senior Referral";
    sub.statusBadge = "badge-warning";
    sub.isReferral = true;
  } else {
    sub.statusText = "Declined";
    sub.statusBadge = "badge-danger";
  }

  if (!sub.decisionLog) sub.decisionLog = [];
  sub.decisionLog.push({
    step: sub.currentStep || 4,
    decision: "declined",
    by: sub.declinedBy,
    at: nowStamp,
    notes: triggerPoint === "Duplicate FEIN"
      ? `Declined (Duplicate FEIN): ${reason}. Referred directly to Senior Underwriter for resolution.`
      : `Declined (${triggerPoint}): ${reason}`
  });

  DECLINE_LOG.unshift({
    subId: sub.id,
    insured: sub.insured,
    lob: sub.lobName,
    triggerPoint,
    reason,
    at: nowStamp
  });

  showToast(
    triggerPoint === "Duplicate FEIN"
      ? `⛔ ${sub.id} declined by ${roleConfig.name} and referred directly to Senior Underwriter for resolution.`
      : `⛔ ${sub.id} declined by ${roleConfig.name}. Logged in Decline Center.`,
    "danger"
  );
  closeDeclineSubmissionModal();

  renderDeclineCenter();
  renderSubmissionsTable();
  refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();

  // If the underwriter was mid-workflow on this submission, return them to
  // the Intake queue since the case is now terminal.
  if (currentPage === "workflow" && activeSubmissionId === sub.id) {
    showIntakePage();
  }
}

function categorizeSubmissionOutcome(sub) {
  const finalStep = WORKFLOW_STEPS.length; // step 7: Formal Quote & Policy Binding
  const hasOutstandingMissing = getOutstandingMissingCount(sub) > 0;
  const isDeclined = sub.lifecycleStatus === "declined";

  if (sub.completedSteps && sub.completedSteps.includes(finalStep)) {
    return "issued"; // Fully completed the Quote & Bind step = policy issued
  }
  if (sub.currentStep >= finalStep) {
    return "quoteGenerated"; // Reached the final step, quote formed, not yet bound
  }
  if (isDeclined || hasOutstandingMissing) {
    return "declinedOrMissing"; // Initiated but blocked before reaching quote generation
  }
  return "inProgress"; // Still moving through the pipeline, not yet categorized
}

function renderTeamActivityMonthlyChart() {
  const container = document.getElementById("teamActivityMonthlyChart");
  if (!container) return;

  const now = new Date();
  const isThisMonth = (ts) => {
    if (!ts) return false;
    const d = new Date(ts);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  };

  let scope = SUBMISSIONS_DATASET.filter(s => isThisMonth(s.receivedTimestamp));
  let usedFallback = false;
  if (scope.length === 0) {
    scope = SUBMISSIONS_DATASET;
    usedFallback = true;
  }

  const counts = { quoteGenerated: 0, issued: 0, declinedOrMissing: 0, inProgress: 0 };
  scope.forEach(sub => { counts[categorizeSubmissionOutcome(sub)]++; });

  const total = scope.length || 1;
  const bars = [
    { key: "quoteGenerated", label: "Quote Generated", value: counts.quoteGenerated, color: "#0369A1", icon: "ph-file-text" },
    { key: "issued", label: "Policy Issued", value: counts.issued, color: "#15803D", icon: "ph-check-circle" },
    { key: "declinedOrMissing", label: "Declined / Missing Info", value: counts.declinedOrMissing, color: "#DC2626", icon: "ph-warning" },
    { key: "inProgress", label: "Still In Progress", value: counts.inProgress, color: "#B45309", icon: "ph-hourglass-medium" }
  ];
  const maxVal = Math.max(1, ...bars.map(b => b.value));

  const chartWidth = 640, chartHeight = 190, barGap = 40, barWidth = 90, baseY = 150;
  const svgBars = bars.map((b, i) => {
    const x = 40 + i * (barWidth + barGap);
    const h = Math.round((b.value / maxVal) * 112);
    const y = baseY - h;
    return `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="6" fill="${b.color}" opacity="0.92"></rect>
      <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="17" font-weight="700" fill="var(--color-ink)">${b.value}</text>
    `;
  }).join("");

  // ---- Team-wide KPI summary strip (computed live, same source data) ----
  const byUW = {};
  SUBMISSIONS_DATASET.forEach(sub => {
    const uw = sub.underwriter || "Unassigned";
    if (!byUW[uw]) byUW[uw] = [];
    byUW[uw].push(sub);
  });
  const teamCount = Object.keys(byUW).length;
  const activeCount = SUBMISSIONS_DATASET.filter(s => (s.currentStep || 1) < WORKFLOW_STEPS.length).length;
  const completedCount = SUBMISSIONS_DATASET.filter(s => (s.currentStep || 1) >= WORKFLOW_STEPS.length).length;
  const delayedCount = SUBMISSIONS_DATASET.filter(s => computeSubmissionActivityFlags(s).isDelayed).length;

  const kpiStrip = `
    <div class="team-kpi-strip">
      <div class="team-kpi-card">
        <div class="team-kpi-icon" style="background:#EFF6FF; color:#0369A1;"><i class="ph ph-users-three"></i></div>
        <div><div class="team-kpi-value">${teamCount}</div><div class="team-kpi-label">Team Members</div></div>
      </div>
      <div class="team-kpi-card">
        <div class="team-kpi-icon" style="background:#FFF7ED; color:#EA6A08;"><i class="ph ph-clock-counter-clockwise"></i></div>
        <div><div class="team-kpi-value">${activeCount}</div><div class="team-kpi-label">Active Submissions</div></div>
      </div>
      <div class="team-kpi-card">
        <div class="team-kpi-icon" style="background:#F0FDF4; color:#15803D;"><i class="ph ph-check-circle"></i></div>
        <div><div class="team-kpi-value">${completedCount}</div><div class="team-kpi-label">Completed</div></div>
      </div>
      <div class="team-kpi-card ${delayedCount > 0 ? 'team-kpi-alert' : ''}">
        <div class="team-kpi-icon" style="background:#FEF2F2; color:#DC2626;"><i class="ph ph-warning"></i></div>
        <div><div class="team-kpi-value">${delayedCount}</div><div class="team-kpi-label">Delayed / At Risk</div></div>
      </div>
    </div>`;

  container.innerHTML = `
    ${kpiStrip}
    <div class="card mb-3">
      <div class="card-header">
        <h3><i class="ph ph-chart-bar"></i> Pipeline Outcomes — ${usedFallback ? "All Submissions" : now.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <span class="badge badge-info">${total} submission${total !== 1 ? 's' : ''}</span>
      </div>
      <div class="card-body">
        ${usedFallback ? `<div class="alert alert-info mb-2" style="font-size:12px;"><i class="ph ph-info"></i> No submissions were received in the current calendar month in this demo dataset — showing all-time totals instead.</div>` : ''}
        <svg viewBox="0 0 ${chartWidth} ${chartHeight}" style="width:100%; max-width:680px; height:auto;">
          <line x1="20" y1="${baseY}" x2="${chartWidth - 20}" y2="${baseY}" stroke="var(--color-border)" stroke-width="1"></line>
          ${svgBars}
        </svg>
        <div class="team-chart-legend">
          ${bars.map(b => `<div class="team-chart-legend-item"><span class="legend-dot" style="background:${b.color};"></span> ${b.label} <strong>(${b.value})</strong></div>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderTeamActivityBoard() {
  const container = document.getElementById("teamActivityBoard");
  if (!container) return;

  // Group all submissions by underwriter (team member)
  const byUW = {};
  SUBMISSIONS_DATASET.forEach(sub => {
    const uw = sub.underwriter || "Unassigned";
    if (!byUW[uw]) byUW[uw] = [];
    byUW[uw].push(sub);
  });

  // Sort team members: anyone with a delayed case surfaces first, since
  // that's what a manager needs to see immediately — then alphabetical.
  const uwNames = Object.keys(byUW).sort((a, b) => {
    const aDelayed = byUW[a].some(s => computeSubmissionActivityFlags(s).isDelayed);
    const bDelayed = byUW[b].some(s => computeSubmissionActivityFlags(s).isDelayed);
    if (aDelayed !== bDelayed) return aDelayed ? -1 : 1;
    return a.localeCompare(b);
  });

  const cards = uwNames.map(uw => {
    const subs = byUW[uw];
    const active = subs.filter(s => (s.currentStep || 1) < WORKFLOW_STEPS.length);
    const completed = subs.filter(s => (s.currentStep || 1) >= WORKFLOW_STEPS.length);
    const flagged = subs.map(s => ({ sub: s, flags: computeSubmissionActivityFlags(s) })).filter(x => x.flags.isDelayed);
    const avatarInitials = uw.split(" ").filter(w => w[0] === w[0].toUpperCase()).slice(0, 2).map(w => w[0]).join("") || uw.slice(0, 2).toUpperCase();

    const rows = subs.map(s => {
      const flags = computeSubmissionActivityFlags(s);
      const pct = Math.round((flags.completed / flags.totalSteps) * 100);
      return `
        <tr>
          <td><code class="font-mono">${s.id}</code></td>
          <td>${s.insured || "N/A"}</td>
          <td>${flags.stepTitle} <span class="text-xs text-muted">(Step ${s.currentStep || 1}/${flags.totalSteps})</span></td>
          <td><span class="badge ${s.statusBadge || 'badge-primary'}">${s.statusText || 'In Progress'}</span></td>
          <td>
            <div class="team-mini-progress" title="${flags.completed}/${flags.totalSteps} steps complete">
              <div class="team-mini-progress-fill" style="width:${pct}%;"></div>
            </div>
          </td>
          <td>${flags.isDelayed
              ? `<span class="badge badge-danger" title="${flags.delayReason}"><i class="ph ph-warning"></i> Delayed</span>`
              : `<span class="badge badge-success"><i class="ph ph-check"></i> On Track</span>`}</td>
        </tr>`;
    }).join("");

    return `
      <div class="card mb-3 team-uw-card ${flagged.length > 0 ? 'team-uw-card-alert' : ''}">
        <div class="card-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="team-uw-avatar">${avatarInitials}</div>
            <h3 style="margin:0;">${uw}</h3>
          </div>
          <div style="display:flex; gap:8px;">
            <span class="badge badge-info">${active.length} Active</span>
            <span class="badge badge-success">${completed.length} Completed</span>
            ${flagged.length > 0 ? `<span class="badge badge-danger">${flagged.length} Delayed</span>` : ""}
          </div>
        </div>
        <div class="card-body p-0">
          <table class="data-table">
            <thead>
              <tr><th>Submission</th><th>Customer</th><th>Current Stage</th><th>Status</th><th>Progress</th><th>Health</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;
  }).join("");

  container.innerHTML = cards || `<div class="text-muted text-sm">No submissions found.</div>`;
}

// ============================================================================
// FEATURE #2: AUDIT LOG (Compliance — Consolidated Underwriting Action Trail)
// ============================================================================
// Every gated underwriter action across the platform writes to one of a
// handful of per-submission arrays (sub.decisionLog, sub.premiumAdjustments,
// sub.submissionVersions) plus the global DECLINE_LOG. Those were previously
// captured but never surfaced anywhere — this page walks all of them, tags
// each entry with a normalized action type, and renders one merged,
// filterable, chronological trail with the acting underwriter's name, role
// and recorded rationale.
const AUDIT_ACTION_META = {
  approved:              { label: "Stage Approved",                icon: "ph-check-circle",             badge: "badge-success", outcome: "outcome-approve" },
  rejected:              { label: "Stage Rejected / Held for Rework", icon: "ph-arrow-counter-clockwise", badge: "badge-warning", outcome: "outcome-refer" },
  declined:              { label: "Submission Declined",            icon: "ph-prohibit",                 badge: "badge-danger",  outcome: "outcome-decline" },
  discretionary_credit:  { label: "Discretionary Credit Applied",   icon: "ph-trend-down",                badge: "badge-primary", outcome: "outcome-pricing" },
  discretionary_debit:   { label: "Discretionary Debit Applied",    icon: "ph-trend-up",                  badge: "badge-primary", outcome: "outcome-pricing" },
  premium_adjustment:    { label: "Premium Adjusted",               icon: "ph-currency-circle-dollar",    badge: "badge-primary", outcome: "outcome-pricing" },
  premium_override:      { label: "Premium Override (Above Authority)", icon: "ph-warning-circle",        badge: "badge-primary", outcome: "outcome-pricing" },
  bound_and_synced:      { label: "Bound & Synced to PAS",          icon: "ph-link",                      badge: "badge-info",    outcome: "outcome-bind" },
  quote_issued:          { label: "Quote Issued",                   icon: "ph-paper-plane-tilt",          badge: "badge-info",    outcome: "outcome-bind" },
  fein_fixed:            { label: "Duplicate FEIN Resolved",        icon: "ph-wrench",                    badge: "badge-warning", outcome: "outcome-refer" },
  archived:              { label: "Submission Archived",            icon: "ph-archive",                   badge: "badge-light",   outcome: "outcome-comm" },
  rfi_sent:              { label: "RFI Sent to Submitter",          icon: "ph-envelope",                  badge: "badge-light",   outcome: "outcome-comm" },
  subjectivity_added:    { label: "Binding Condition Added",        icon: "ph-list-plus",                 badge: "badge-light",   outcome: "outcome-comm" },
  submission_updated:    { label: "Submission Data Updated",        icon: "ph-note-pencil",               badge: "badge-light",   outcome: "outcome-comm" }
};

function auditActionMeta(type) {
  return AUDIT_ACTION_META[type] || {
    label: (type || "Action Recorded").replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    icon: "ph-info",
    badge: "badge-light",
    outcome: "outcome-comm"
  };
}

/** Walks every submission's action arrays + the global decline log and
 *  returns one flat, normalized, newest-first list of audit entries. */
function collectAuditLogEntries() {
  const entries = [];

  SUBMISSIONS_DATASET.forEach(sub => {
    const insuredLabel = sub.insured || sub.channelName || sub.accountName || "N/A";

    (sub.decisionLog || []).forEach(d => {
      entries.push({
        type: d.decision,
        at: d.at,
        by: d.by,
        subId: sub.id,
        insured: insuredLabel,
        note: d.notes || null
      });
    });

    (sub.premiumAdjustments || []).forEach(p => {
      entries.push({
        type: p.isOverride ? "premium_override" : "premium_adjustment",
        at: p.at,
        by: p.by,
        subId: sub.id,
        insured: insuredLabel,
        note: `$${(p.oldPremium || 0).toLocaleString()} → $${(p.newPremium || 0).toLocaleString()} (Trust/Risk Score ${p.trustScoreAtAdjustment}/100). ${p.reason}`
      });
    });

    (sub.submissionVersions || []).forEach(v => {
      const parts = [];
      if (v.changes && v.changes.length) parts.push(`${v.changes.length} field(s) updated`);
      if (v.resolvedDocs && v.resolvedDocs.length) parts.push(`${v.resolvedDocs.length} outstanding document(s) resolved`);
      if (v.resolvedDataFields && v.resolvedDataFields.length) parts.push(`${v.resolvedDataFields.length} outstanding data field(s) resolved`);
      if (v.newMissingDocs && v.newMissingDocs.length) parts.push(`${v.newMissingDocs.length} new missing document(s) flagged`);
      if (v.newMissingDataFields && v.newMissingDataFields.length) parts.push(`${v.newMissingDataFields.length} new missing data field(s) flagged`);
      const thread = sub.communicationThread || [];
      const sourceMsg = typeof v.threadRef === "number" && thread[v.threadRef] ? thread[v.threadRef].message : null;
      entries.push({
        type: "submission_updated",
        at: v.at,
        by: v.by,
        subId: sub.id,
        insured: insuredLabel,
        note: `${parts.join(", ") || "Communication logged"} (Version ${v.version}, ${v.updateType || "update"}).${sourceMsg ? ` Source: "${sourceMsg}"` : ""}`
      });
    });
  });

  // Historical decline records that predate/aren't mirrored in a
  // submission's own decisionLog (legacy seed rows in DECLINE_LOG).
  DECLINE_LOG.forEach(d => {
    const mirroredInDecisionLog = SUBMISSIONS_DATASET.some(s =>
      s.id === d.subId && (s.decisionLog || []).some(dl => dl.decision === "declined" && dl.at === d.at)
    );
    if (!mirroredInDecisionLog) {
      entries.push({
        type: "declined",
        at: d.at,
        by: "— (Historical / Pre-Migration Record)",
        subId: d.subId,
        insured: d.insured,
        note: `Declined (${d.triggerPoint}): ${d.reason}${d.fixed ? ` — Duplicate FEIN later resolved by ${d.fixedBy} (new FEIN ${d.newFein}) on ${d.fixedAt}.` : ""}`
      });
    }
  });

  entries.sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")));
  return entries;
}

function populateAuditLogFilterOptions() {
  const entries = collectAuditLogEntries();

  const actionSelect = document.getElementById("auditLogActionFilter");
  if (actionSelect) {
    const prevVal = actionSelect.value || "all";
    const types = Array.from(new Set(entries.map(e => e.type))).sort();
    actionSelect.innerHTML = `<option value="all">All Action Types</option>` +
      types.map(t => `<option value="${t}">${auditActionMeta(t).label}</option>`).join("");
    actionSelect.value = types.includes(prevVal) ? prevVal : "all";
  }

  const actorSelect = document.getElementById("auditLogActorFilter");
  if (actorSelect) {
    const prevVal = actorSelect.value || "all";
    const actors = Array.from(new Set(entries.map(e => e.by).filter(Boolean))).sort();
    actorSelect.innerHTML = `<option value="all">All Underwriters</option>` +
      actors.map(a => `<option value="${a}">${a}</option>`).join("");
    actorSelect.value = actors.includes(prevVal) ? prevVal : "all";
  }
}

function resetAuditLogFilters() {
  const searchInput = document.getElementById("auditLogSearchInput");
  const actionSelect = document.getElementById("auditLogActionFilter");
  const actorSelect = document.getElementById("auditLogActorFilter");
  if (searchInput) searchInput.value = "";
  if (actionSelect) actionSelect.value = "all";
  if (actorSelect) actorSelect.value = "all";
  renderAuditLogFeed();
}

function renderAuditLogFeed() {
  const feedEl = document.getElementById("auditLogFeed");
  const summaryEl = document.getElementById("auditLogSummary");
  if (!feedEl || !hasPermission("auditLog", "view")) return;

  let entries = collectAuditLogEntries();

  if (summaryEl) {
    const declineCount = entries.filter(e => e.type === "declined").length;
    const pricingCount = entries.filter(e => ["discretionary_credit", "discretionary_debit", "premium_adjustment", "premium_override"].includes(e.type)).length;
    const bindCount = entries.filter(e => ["bound_and_synced", "quote_issued"].includes(e.type)).length;
    const activeUnderwriters = new Set(entries.map(e => e.by).filter(Boolean)).size;
    summaryEl.innerHTML = `
      <div class="metrics-summary-bar">
        <div class="metric-box">
          <span class="lbl"><i class="ph ph-list-checks"></i> Total Recorded Actions</span>
          <strong class="val" id="auditLogTotalCount">${entries.length}</strong>
        </div>
        <div class="metric-box">
          <span class="lbl"><i class="ph ph-prohibit text-danger"></i> Declines</span>
          <strong class="val text-danger">${declineCount}</strong>
        </div>
        <div class="metric-box">
          <span class="lbl"><i class="ph ph-currency-circle-dollar text-primary"></i> Pricing Actions</span>
          <strong class="val text-primary">${pricingCount}</strong>
        </div>
        <div class="metric-box">
          <span class="lbl"><i class="ph ph-link text-success"></i> Binds &amp; Issuances</span>
          <strong class="val text-success">${bindCount}</strong>
        </div>
        <div class="metric-box">
          <span class="lbl"><i class="ph ph-users text-warning"></i> Underwriters Active</span>
          <strong class="val text-warning">${activeUnderwriters}</strong>
        </div>
      </div>
    `;
  }

  const searchInput = document.getElementById("auditLogSearchInput");
  const actionSelect = document.getElementById("auditLogActionFilter");
  const actorSelect = document.getElementById("auditLogActorFilter");
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const actionType = actionSelect ? actionSelect.value : "all";
  const actor = actorSelect ? actorSelect.value : "all";

  if (actionType !== "all") entries = entries.filter(e => e.type === actionType);
  if (actor !== "all") entries = entries.filter(e => e.by === actor);
  if (searchTerm) {
    entries = entries.filter(e =>
      (e.subId || "").toLowerCase().includes(searchTerm) ||
      (e.insured || "").toLowerCase().includes(searchTerm) ||
      (e.by || "").toLowerCase().includes(searchTerm) ||
      (e.note || "").toLowerCase().includes(searchTerm)
    );
  }

  if (!entries.length) {
    feedEl.innerHTML = `<div class="audit-log-empty"><i class="ph ph-magnifying-glass" style="font-size:26px; display:block; margin-bottom:8px;"></i>No audit entries match the current filters.</div>`;
    return;
  }

  feedEl.innerHTML = `<div class="audit-log-feed">` + entries.map(e => {
    const meta = auditActionMeta(e.type);
    return `
      <div class="audit-log-item ${meta.outcome}">
        <div class="audit-log-item-head">
          <div class="audit-log-item-actor">
            <span class="icon"><i class="ph ${meta.icon}"></i></span>
            <strong>${e.by || "Unknown"}</strong>
          </div>
          <div class="audit-log-item-meta">
            <span class="badge ${meta.badge}">${meta.label}</span>
            <span><i class="ph ph-clock"></i> ${e.at || "—"}</span>
          </div>
        </div>
        <p class="audit-log-item-sub">
          <i class="ph ph-hash"></i> <code>${e.subId}</code> <span>&mdash;</span> <span>${e.insured}</span>
        </p>
        ${e.note ? `<div class="audit-log-item-note"><i class="ph ph-quotes"></i> ${e.note}</div>` : ""}
      </div>`;
  }).join("") + `</div>`;
}

/** Re-renders the Audit Log feed only if that page is currently open —
 *  called after every gated underwriter action so the trail stays live. */
function refreshAuditLogIfVisible() {
  if (currentPage === "audit-log" && hasPermission("auditLog", "view")) {
    populateAuditLogFilterOptions();
    renderAuditLogFeed();
  }
}

function showAuditLogPage() {
  currentPage = "audit-log";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex", onClick: "showIntakePage()" }, { label: "Compliance" }, { label: "Audit Log" }]);

  const page = document.getElementById("auditLogPageView");
  if (page) { page.style.display = "block"; page.classList.add("active"); }

  const nav = document.getElementById("navItemAuditLog");
  if (nav) nav.classList.add("active");

  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  const notice = document.getElementById("auditLogAuthNotice");
  const contentEl = document.getElementById("auditLogPageContent");
  const canView = hasPermission("auditLog", "view");
  if (notice) notice.style.display = canView ? "none" : "flex";
  if (contentEl) contentEl.style.display = canView ? "block" : "none";

  if (canView) {
    populateAuditLogFilterOptions();
    renderAuditLogFeed();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================================
// FEATURE #3: QUOTE INTELLIGENCE (Renewal Comparison + Multiple Quote Comparison)
// ============================================================================
let quoteIntelActiveTab = "renewal";
let selectedCompareIds = [];

function showQuoteIntelligencePage() {
  currentPage = "quote-intel";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex", onClick: "showIntakePage()" }, { label: "Quote Intelligence" }]);

  const page = document.getElementById("quoteIntelligencePageView");
  if (page) { page.style.display = "block"; page.classList.add("active"); }

  const nav = document.getElementById("navItemQuoteIntel");
  if (nav) nav.classList.add("active");

  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  switchQuoteIntelTab(quoteIntelActiveTab);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================================
// USER MASTER — Admin-only dashboard for team roster + permission matrix
// ============================================================================
let userMasterSelectedResource = "documents";
let editingTeamUserId = null; // null = Add User modal is in "add" mode; otherwise editing this TEAM_USERS.id

// ============================================================================
// UNIFIED ACCOUNT VIEW — cross-LOB customer record (Requirement: unified
// account/submission record across lines). Groups all submissions that
// belong to the same parent account (accountName) OR share the same
// insured name, across every line of business, into one account record.
// ============================================================================
function getUnifiedAccountRecords(searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return [];

  return SUBMISSIONS_DATASET.filter(s => {
    const account = (s.accountName || "").toLowerCase();
    const insured = (s.insured || "").toLowerCase();
    return account.includes(term) || insured.includes(term);
  });
}

function showUnifiedAccountPage() {
  currentPage = "unified-account";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex", onClick: "showIntakePage()" }, { label: "Unified Account View" }]);

  const page = document.getElementById("unifiedAccountPageView");
  if (page) { page.style.display = "block"; page.classList.add("active"); }

  const nav = document.getElementById("navItemUnifiedAccount");
  if (nav) nav.classList.add("active");

  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  const notice = document.getElementById("unifiedAccountAuthNotice");
  const searchArea = document.getElementById("unifiedAccountSearchArea");
  const isAuthorized = hasPermission("unifiedAccount", "view");
  if (notice) notice.style.display = isAuthorized ? "none" : "flex";
  if (searchArea) searchArea.style.display = isAuthorized ? "block" : "none";

  if (isAuthorized) renderUnifiedAccountView();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderUnifiedAccountView() {
  if (!hasPermission("unifiedAccount", "view")) return;

  const resultsEl = document.getElementById("unifiedAccountResults");
  if (!resultsEl) return;

  const term = document.getElementById("unifiedAccountSearchInput")?.value || "";
  if (!term.trim()) {
    resultsEl.innerHTML = `<div class="text-muted text-sm">Type any account or customer name and click "Show" — if that account has more than one line of business on file, its unified cross-LOB record will appear here.</div>`;
    return;
  }

  const records = getUnifiedAccountRecords(term);
  if (records.length === 0) {
    resultsEl.innerHTML = `<div class="text-muted text-sm">No account or customer found matching "${term}".</div>`;
    return;
  }

  // Aggregate account-level summary
  const totalPremium = records.reduce((sum, s) => sum + getSubmissionPremium(s), 0);
  const totalExposure = records.reduce((sum, s) => sum + (s.exposureVal || 0), 0);
  const distinctLOBs = Array.from(new Set(records.map(s => s.lobName)));
  const avgTrustScore = Math.round(records.reduce((sum, s) => sum + getSubmissionTrustScore(s), 0) / records.length);
  const accountLabel = records[0].accountName || records[0].insured;

  if (distinctLOBs.length <= 1) {
    resultsEl.innerHTML = `
      <div class="alert alert-info" style="font-size:12.5px;">
        <i class="ph ph-info"></i> <strong>${accountLabel}</strong> only has <strong>one</strong> line of business on file (${distinctLOBs[0]}). Unified Account View is intended for accounts with multiple lines — there's nothing to unify here yet.
      </div>`;
    return;
  }

  const rows = records.map(s => `
    <tr>
      <td><code class="font-mono">${s.id}</code></td>
      <td><strong>${s.insured}</strong>${s.accountName ? `<br><span class="text-xs text-muted">Account: ${s.accountName}</span>` : ''}</td>
      <td><span class="badge badge-primary">${s.lobName}</span></td>
      <td>${s.underwriter || "Unassigned"}</td>
      <td class="font-mono">$${getSubmissionPremium(s).toLocaleString()}</td>
      <td><span class="badge ${s.statusBadge || 'badge-primary'}">${s.statusText || ''}</span></td>
      <td>${s.receivedAt || ''}</td>
      <td><button class="btn btn-xs btn-outline" onclick="openCaseAtCurrentStep('${s.id}')"><i class="ph ph-eye"></i> View</button></td>
    </tr>`).join("");

  resultsEl.innerHTML = `
    <div class="card mb-3">
      <div class="card-header">
        <h3><i class="ph ph-buildings"></i> ${accountLabel} — Account Summary</h3>
        <span class="badge badge-info">${records.length} submission${records.length !== 1 ? 's' : ''} across ${distinctLOBs.length} line${distinctLOBs.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="card-body">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px,1fr)); gap:14px; font-size:13px;">
          <div><span class="text-xs text-muted">Total Premium (All Lines)</span><br><strong class="font-mono" style="font-size:15px;">$${totalPremium.toLocaleString()}</strong></div>
          <div><span class="text-xs text-muted">Total Exposure</span><br><strong class="font-mono">$${totalExposure.toLocaleString()}</strong></div>
          <div><span class="text-xs text-muted">Lines of Business</span><br><strong>${distinctLOBs.join(", ")}</strong></div>
          <div><span class="text-xs text-muted">Average Trust/Risk Score</span><br><strong>${avgTrustScore}/100</strong></div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><h3><i class="ph ph-list-checks"></i> Submissions Across All Lines</h3></div>
      <div class="card-body p-0">
        <table class="data-table">
          <thead><tr><th>Submission</th><th>Named Insured</th><th>Line of Business</th><th>Underwriter</th><th>Premium</th><th>Status</th><th>Received</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

// ============================================================================
// INTEGRATING API FROM PRODUCT — Standalone product REST API JSON payload viewer
// Demonstrates live data ingestion from standalone product endpoints into VeriDex.
// ============================================================================
function showProductApiIntegrationPage() {
  currentPage = "product-api-integration";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex", onClick: "showIntakePage()" }, { label: "Integrations" }, { label: "Integrating API from Product" }]);

  const page = document.getElementById("productApiIntegrationPageView");
  if (page) { page.style.display = "block"; page.classList.add("active"); }

  const nav = document.getElementById("navItemProductApi");
  if (nav) nav.classList.add("active");

  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  renderProductApiIntegrationView();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getProductApiIngestedJson(sub) {
  if (!sub) sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];

  return {
    integration_meta: {
      source_system: "Standalone Commercial UW Product Suite v2.4",
      api_endpoint: "/api/v2/standalone-product/ingest",
      http_status: 200,
      ingested_at: new Date().toISOString(),
      environment: "production_live_sync",
      auth_mechanism: "OAuth2 Bearer Token (VeriDex API Gateway)"
    },
    ingested_submission: {
      id: sub.id,
      lob_key: sub.lobKey,
      lob_name: sub.lobName,
      named_insured: sub.insured,
      fein: sub.fein,
      dot_number: sub.dot,
      garaging_address: sub.address,
      broker_agency: sub.broker,
      broker_email: sub.email,
      assigned_underwriter: sub.underwriter || "Sarah Jenkins",
      total_exposure: sub.exposure,
      authority_limit: sub.authorityLimit
    },
    standalone_product_data: {
      account_profile: sub.insuredInfo || {
        entity_type: "Corporation / LLC",
        years_of_experience: 5,
        icc_filings: "No"
      },
      vehicles_schedule: (sub.vehicles || []).map(v => ({
        unit_id: v.xid || v.id,
        year: v.year,
        make: v.make,
        model: v.model,
        model_number: v.model_number || ("MOD-2024-TRK" + (v.xid || v.id)),
        assigned_driver: v.assigned_driver || "Apex Freight LLC (CDL Class A)",
        operating_radius_miles: v.miles_driven || 450,
        stated_value: v.stated_value,
        al_value: v.al_value,
        rating_class: v.rating_class,
        liab_baserate: v.liab_baserate || 837,
        item_premium: v.liability_premium || "$36,200.00"
      })),
      drivers_schedule: sub.drivers || [],
      appetite_rules_evaluation: sub.appetiteRules || [],
      third_party_enrichment: sub.enrichmentCards || [],
      loss_history_triangulation: sub.losses || []
    }
  };
}

function renderProductApiIntegrationView() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];
  const payload = getProductApiIngestedJson(sub);

  const subDisplay = document.getElementById("productApiSubIdDisplay");
  if (subDisplay) subDisplay.textContent = `${sub.id} • ${sub.insured}`;

  const tsDisplay = document.getElementById("productApiTimestampDisplay");
  if (tsDisplay) tsDisplay.textContent = `Ingested: ${new Date().toLocaleTimeString()} (Live API Stream)`;

  const codeBlock = document.getElementById("productApiJsonCodeBlock");
  if (codeBlock) {
    const jsonStr = JSON.stringify(payload, null, 2);
    codeBlock.innerHTML = syntaxHighlightJSON(jsonStr);
  }
}

function triggerProductApiIngestion() {
  showToast("🔄 Connecting to Standalone Product API endpoint...", "info");
  const codeBlock = document.getElementById("productApiJsonCodeBlock");
  if (codeBlock) {
    codeBlock.innerHTML = `<span style="color:#94a3b8;"><i class="ph ph-spinner spin"></i> Ingesting fresh API payload from standalone product...</span>`;
  }
  setTimeout(() => {
    renderProductApiIntegrationView();
    showToast("✅ Fresh API payload successfully ingested from Standalone Product! (HTTP 200 OK)", "success");
  }, 800);
}

function copyProductApiJson() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];
  const payload = getProductApiIngestedJson(sub);
  const text = JSON.stringify(payload, null, 2);
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Standalone Product API JSON copied to clipboard!", "success");
  }).catch(() => fallbackCopyText(text));
}

function downloadProductApiJson() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];
  const payload = getProductApiIngestedJson(sub);
  const text = JSON.stringify(payload, null, 2);
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Product_API_Ingested_Payload_${sub.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("📥 Downloading Standalone Product API JSON file...", "info");
}

function showUserMasterPage() {
  currentPage = "user-master";
  resetAllTopLevelPages();
  setBreadcrumb([{ label: "VeriDex", onClick: "showIntakePage()" }, { label: "Admin" }, { label: "User Master" }]);

  const page = document.getElementById("userMasterPageView");
  if (page) { page.style.display = "block"; page.classList.add("active"); }

  const nav = document.getElementById("navItemUserMaster");
  if (nav) nav.classList.add("active");

  const footer = document.getElementById("workflowBottomFooter");
  if (footer) footer.style.display = "none";
  document.body.classList.remove("has-bottom-footer");

  const notice = document.getElementById("userMasterAuthNotice");
  const content = document.getElementById("userMasterContent");
  const isAdmin = currentUserRole === "admin";

  if (notice) notice.style.display = isAdmin ? "none" : "flex";
  if (content) content.style.display = isAdmin ? "block" : "none";

  if (!isAdmin) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  renderTeamRoster();
  populateResourceSelect();
  renderPermissionMatrixEditor();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================================
// TEAM ROSTER — flexible list of named users, each assigned one of the
// fixed role types (for permissions). Separate from USER_ROLES_CONFIG,
// which defines the persona archetypes used by the RBAC matrix and the
// role switcher; TEAM_USERS is the actual roster an admin manages.
// ============================================================================
// Default jurisdiction/LOB/coverage authority seeded per role archetype,
// reflecting the desks visible in the submissions dataset (e.g. Sarah
// Jenkins/David Chen on trucking, David Chen also on property, Elena
// Rostova on MPL). CUO, Binding Ops, Audit and Admin are cross-line/
// national since their function spans every desk.
const DEFAULT_ROLE_AUTHORITY = {
  assistant: { states: ALL_STATE_CODES.slice(), lobs: ALL_LOB_KEYS.slice(), coverages: [] },
  junior: { states: ["TX", "LA", "OK"], lobs: ["trucking"], coverages: getCoveragesForLOBs(["trucking"]) },
  senior_uw: { states: ["TX", "LA", "OK", "NM"], lobs: ["trucking", "property"], coverages: getCoveragesForLOBs(["trucking", "property"]) },
  senior: { states: ALL_STATE_CODES.slice(), lobs: ALL_LOB_KEYS.slice(), coverages: getCoveragesForLOBs(ALL_LOB_KEYS) },
  binder: { states: ALL_STATE_CODES.slice(), lobs: ALL_LOB_KEYS.slice(), coverages: getCoveragesForLOBs(ALL_LOB_KEYS) },
  auditor: { states: ALL_STATE_CODES.slice(), lobs: ALL_LOB_KEYS.slice(), coverages: getCoveragesForLOBs(ALL_LOB_KEYS) },
  admin: { states: ALL_STATE_CODES.slice(), lobs: ALL_LOB_KEYS.slice(), coverages: getCoveragesForLOBs(ALL_LOB_KEYS) }
};

let TEAM_USERS = Object.keys(USER_ROLES_CONFIG).map(roleKey => {
  const role = USER_ROLES_CONFIG[roleKey];
  const authority = DEFAULT_ROLE_AUTHORITY[roleKey] || { states: [], lobs: [], coverages: [] };
  return {
    id: `u_${roleKey}`,
    name: role.name,
    title: role.title,
    email: "",
    roleKey,
    limit: role.limit,
    description: role.description,
    states: authority.states.slice(),
    lobs: authority.lobs.slice(),
    coverages: authority.coverages.slice(),
    isDefault: true
  };
});

function renderTeamRoster() {
  const tbody = document.getElementById("userMasterRosterBody");
  const countEl = document.getElementById("userMasterRosterCount");
  if (!tbody) return;

  const rows = TEAM_USERS.map(user => {
    const role = USER_ROLES_CONFIG[user.roleKey] || USER_ROLES_CONFIG.junior;
    const activeCount = SUBMISSIONS_DATASET.filter(s => s.underwriter && s.underwriter.startsWith(user.name)).length;
    const states = user.states || [];
    const lobs = user.lobs || [];
    const statesSummary = states.length === 0 ? "No states"
      : states.length === ALL_STATE_CODES.length ? "All states"
      : `${states.length} state${states.length !== 1 ? 's' : ''}`;
    const lobsSummary = lobs.length === 0 ? "No lines" : `${lobs.length} line${lobs.length !== 1 ? 's' : ''} of business`;
    return `
      <tr>
        <td>${role.icon} <strong>${user.name}</strong>${user.email ? `<br><span class="text-xs text-muted">${user.email}</span>` : ''}</td>
        <td><span class="badge badge-primary">${user.title}</span></td>
        <td class="font-mono">$${user.limit.toLocaleString()}</td>
        <td>${activeCount}</td>
        <td>
          <button class="btn btn-xs btn-outline" onclick="viewUserAuthority('${user.id}')" title="View jurisdiction & LOB authority">
            <i class="ph ph-map-pin-area"></i> ${statesSummary} · ${lobsSummary}
          </button>
        </td>
        <td class="text-xs text-muted">${user.description || '—'}</td>
        <td style="white-space:nowrap;">
          <button class="btn btn-xs btn-outline" onclick="editTeamUser('${user.id}')" title="Edit user"><i class="ph ph-pencil-simple"></i></button>
          ${user.isDefault ? '' : `<button class="btn btn-xs btn-outline" onclick="removeTeamUser('${user.id}')" title="Remove user"><i class="ph ph-trash"></i></button>`}
        </td>
      </tr>`;
  }).join("");

  tbody.innerHTML = rows;
  if (countEl) countEl.textContent = `${TEAM_USERS.length} users`;
}

/**
 * Read-only "Jurisdiction & LOB Authority" modal for a roster row — keeps
 * the Team Roster table compact while still surfacing the full state/LOB/
 * coverage breakdown. Editing happens via editTeamUser(), not here.
 */
function viewUserAuthority(userId) {
  const user = TEAM_USERS.find(u => u.id === userId);
  if (!user) return;
  const role = USER_ROLES_CONFIG[user.roleKey] || USER_ROLES_CONFIG.junior;
  const states = user.states || [];
  const lobs = user.lobs || [];
  const coverages = new Set(user.coverages || []);

  document.getElementById("userAuthorityModalTitle").textContent = `${role.icon} ${user.name} — Jurisdiction & LOB Authority`;

  const statesEl = document.getElementById("userAuthorityStates");
  if (states.length === 0) {
    statesEl.innerHTML = `<span class="text-muted text-sm">Not authorized in any state.</span>`;
  } else if (states.length === ALL_STATE_CODES.length) {
    statesEl.innerHTML = `<span class="badge badge-info">All 50 States + DC</span>`;
  } else {
    statesEl.innerHTML = states.map(code => {
      const s = US_STATES.find(st => st.code === code);
      return `<span class="badge badge-outline" style="margin:2px;">${s ? s.name : code}</span>`;
    }).join("");
  }

  const lobEl = document.getElementById("userAuthorityLobs");
  if (lobs.length === 0) {
    lobEl.innerHTML = `<span class="text-muted text-sm">Not assigned to any line of business.</span>`;
  } else {
    lobEl.innerHTML = lobs.map(key => {
      const lob = LOB_CATALOG.find(l => l.key === key);
      if (!lob) return "";
      const lobCoverages = lob.coverages.filter(c => coverages.has(c));
      return `
        <div class="mb-2">
          <span class="badge badge-primary mb-1">${lob.name}</span>
          ${lobCoverages.length > 0
            ? `<ul style="margin:4px 0 0 18px; padding:0; font-size:12.5px;">${lobCoverages.map(c => `<li>${c}</li>`).join("")}</ul>`
            : `<div class="text-xs text-muted" style="margin-left:2px;">No coverages authorized on this line.</div>`}
        </div>`;
    }).join("");
  }

  const modal = document.getElementById("userAuthorityModal");
  if (modal) modal.style.display = "flex";
}

function closeUserAuthorityModal() {
  const modal = document.getElementById("userAuthorityModal");
  if (modal) modal.style.display = "none";
}

/**
 * Appends a new persona to the header role switcher dropdown so a newly
 * added user is genuinely selectable — not just visible in the roster.
 */
function addRoleDropdownOption(roleKey, name, title, limit) {
  const select = document.getElementById("userRoleSelect");
  if (!select) return;
  const role = USER_ROLES_CONFIG[roleKey];
  const opt = document.createElement("option");
  opt.value = roleKey;
  const limitLabel = limit > 0 ? `$${(limit / 1000000).toFixed(1)}M Limit` : "No Authority Limit";
  opt.textContent = `${role ? role.icon : "👤"} ${title} (${name} - ${limitLabel})`;
  select.appendChild(opt);
}

function openAddUserModal() {
  if (currentUserRole !== "admin") {
    showToast("⛔ Only the System Administrator can add users.", "danger");
    return;
  }

  editingTeamUserId = null;
  setAddUserModalMode("add");

  const roleSelect = document.getElementById("addUserRole");
  if (roleSelect) {
    roleSelect.innerHTML = Object.keys(USER_ROLES_CONFIG).map(roleKey => {
      const role = USER_ROLES_CONFIG[roleKey];
      return `<option value="${roleKey}">${role.icon} ${role.title}</option>`;
    }).join("");
  }

  document.getElementById("addUserName").value = "";
  document.getElementById("addUserTitle").value = "";
  document.getElementById("addUserEmail").value = "";
  prefillAddUserAuthorityLimit();
  renderAddUserStatesSelect([]);
  renderAddUserLobChecklist([]);
  renderAddUserCoverageChecklist([], []);

  const modal = document.getElementById("addUserModal");
  if (modal) modal.style.display = "flex";
}

/**
 * Opens the same Add User modal pre-filled with an existing roster member's
 * details (including their default-seeded ones) so admin can update role,
 * authority limit, licensed states, lines of business and coverages.
 */
function editTeamUser(userId) {
  if (currentUserRole !== "admin") {
    showToast("⛔ Only the System Administrator can edit users.", "danger");
    return;
  }
  const user = TEAM_USERS.find(u => u.id === userId);
  if (!user) return;

  editingTeamUserId = userId;
  setAddUserModalMode("edit");

  const roleSelect = document.getElementById("addUserRole");
  if (roleSelect) {
    roleSelect.innerHTML = Object.keys(USER_ROLES_CONFIG).map(roleKey => {
      const role = USER_ROLES_CONFIG[roleKey];
      return `<option value="${roleKey}">${role.icon} ${role.title}</option>`;
    }).join("");
    roleSelect.value = user.roleKey;
  }

  document.getElementById("addUserName").value = user.name || "";
  document.getElementById("addUserTitle").value = user.title || "";
  document.getElementById("addUserEmail").value = user.email || "";
  document.getElementById("addUserLimit").value = user.limit;
  renderAddUserStatesSelect(user.states || []);
  renderAddUserLobChecklist(user.lobs || []);
  renderAddUserCoverageChecklist(user.lobs || [], user.coverages || []);

  const modal = document.getElementById("addUserModal");
  if (modal) modal.style.display = "flex";
}

function setAddUserModalMode(mode) {
  const title = document.getElementById("addUserModalTitle");
  const desc = document.getElementById("addUserModalDesc");
  const saveLabel = document.getElementById("addUserSaveBtnLabel");
  if (mode === "edit") {
    if (title) title.textContent = "Edit User";
    if (desc) desc.textContent = "Updates this team member's role, authority limit, licensed states, lines of business and coverages.";
    if (saveLabel) saveLabel.textContent = "Save Changes";
  } else {
    if (title) title.textContent = "Add New User";
    if (desc) desc.textContent = "Adds a team member to the roster. They inherit permissions from the assigned role.";
    if (saveLabel) saveLabel.textContent = "Add User";
  }
}

function prefillAddUserAuthorityLimit() {
  const roleKey = document.getElementById("addUserRole").value;
  const role = USER_ROLES_CONFIG[roleKey];
  const limitInput = document.getElementById("addUserLimit");
  if (role && limitInput && editingTeamUserId === null) limitInput.value = role.limit;
}

/** Renders the multi-select of underwriting-licensed states, pre-checking any already selected. */
function renderAddUserStatesSelect(selectedCodes) {
  const select = document.getElementById("addUserStates");
  if (!select) return;
  const selectedSet = new Set(selectedCodes || []);
  select.innerHTML = US_STATES.map(s =>
    `<option value="${s.code}" ${selectedSet.has(s.code) ? "selected" : ""}>${s.code} — ${s.name}</option>`
  ).join("");
}

/** Renders LOB checkboxes; toggling one refreshes the dependent coverage checklist below it. */
function renderAddUserLobChecklist(selectedLobKeys) {
  const container = document.getElementById("addUserLobChecklist");
  if (!container) return;
  const selectedSet = new Set(selectedLobKeys || []);
  container.innerHTML = LOB_CATALOG.map(lob => `
    <label style="display:flex; align-items:center; gap:6px; font-weight:400; font-size:12.5px;">
      <input type="checkbox" class="add-user-lob-cb" value="${lob.key}" ${selectedSet.has(lob.key) ? "checked" : ""} onchange="onAddUserLobsChanged()">
      ${lob.name}
    </label>`).join("");
}

/** Reads currently-checked LOBs and rebuilds the coverage checklist to match, keeping prior coverage checks where still applicable. */
function onAddUserLobsChanged() {
  const checkedLobs = Array.from(document.querySelectorAll(".add-user-lob-cb:checked")).map(cb => cb.value);
  const currentlyCheckedCoverages = Array.from(document.querySelectorAll(".add-user-coverage-cb:checked")).map(cb => cb.value);
  renderAddUserCoverageChecklist(checkedLobs, currentlyCheckedCoverages);
}

/** Renders coverage checkboxes scoped to the selected LOBs only; new LOB coverages default to checked. */
function renderAddUserCoverageChecklist(selectedLobKeys, checkedCoverages) {
  const container = document.getElementById("addUserCoverageChecklist");
  if (!container) return;
  const availableCoverages = getCoveragesForLOBs(selectedLobKeys);
  if (availableCoverages.length === 0) {
    container.innerHTML = `<span class="text-xs text-muted">Select a line of business above to choose its coverages.</span>`;
    return;
  }
  const checkedSet = new Set(checkedCoverages || availableCoverages);
  container.innerHTML = availableCoverages.map(cov => `
    <label style="display:flex; align-items:center; gap:6px; font-weight:400; font-size:12.5px;">
      <input type="checkbox" class="add-user-coverage-cb" value="${cov}" ${checkedSet.has(cov) ? "checked" : ""}>
      ${cov}
    </label>`).join("");
}

function closeAddUserModal() {
  editingTeamUserId = null;
  const modal = document.getElementById("addUserModal");
  if (modal) modal.style.display = "none";
}

function saveNewUser() {
  if (currentUserRole !== "admin") {
    showToast("⛔ Only the System Administrator can add users.", "danger");
    return;
  }

  const name = document.getElementById("addUserName").value.trim();
  const title = document.getElementById("addUserTitle").value.trim();
  const email = document.getElementById("addUserEmail").value.trim();
  const baseRoleKey = document.getElementById("addUserRole").value;
  const limit = parseInt(document.getElementById("addUserLimit").value, 10);
  const states = Array.from(document.getElementById("addUserStates").selectedOptions).map(o => o.value);
  const lobs = Array.from(document.querySelectorAll(".add-user-lob-cb:checked")).map(cb => cb.value);
  const coverages = Array.from(document.querySelectorAll(".add-user-coverage-cb:checked")).map(cb => cb.value);

  if (!name || !title) {
    showToast("⛔ Name and Job Title are required to add a user.", "danger");
    return;
  }
  if (isNaN(limit) || limit < 0) {
    showToast("⛔ Enter a valid authority limit.", "danger");
    return;
  }

  // Editing an existing roster member: update their fields in place, keep
  // their existing role key (and RBAC permissions) untouched.
  if (editingTeamUserId !== null) {
    const user = TEAM_USERS.find(u => u.id === editingTeamUserId);
    if (!user) { closeAddUserModal(); return; }
    user.name = name;
    user.title = title;
    user.email = email;
    user.limit = limit;
    user.states = states;
    user.lobs = lobs;
    user.coverages = coverages;
    renderTeamRoster();
    closeAddUserModal();
    showToast(`✅ ${name} updated.`, "success");
    return;
  }

  const baseRole = USER_ROLES_CONFIG[baseRoleKey];

  // Give this person their OWN role key (rather than reusing the shared
  // archetype key) so they become a genuinely separate, selectable persona
  // in the role switcher — not just a roster row. Their permissions start
  // as a copy of the base role's permissions, editable independently from
  // User Master afterward.
  const newRoleKey = `custom_${Date.now()}`;
  USER_ROLES_CONFIG[newRoleKey] = {
    name,
    title,
    limit,
    limitText: `$${limit.toLocaleString()} Authority Limit`,
    icon: baseRole ? baseRole.icon : "👤",
    description: `Added by ${(USER_ROLES_CONFIG[currentUserRole] || {}).name || 'Admin'} — inherits ${baseRole ? baseRole.title : baseRoleKey} permissions.`
  };
  PERMISSIONS_MATRIX[newRoleKey] = JSON.parse(JSON.stringify(
    PERMISSIONS_MATRIX[baseRoleKey] || PERMISSIONS_MATRIX.junior
  ));

  const newUser = {
    id: `u_${newRoleKey}`,
    name,
    title,
    email,
    roleKey: newRoleKey,
    limit,
    description: USER_ROLES_CONFIG[newRoleKey].description,
    states,
    lobs,
    coverages,
    isDefault: false
  };

  TEAM_USERS.push(newUser);
  addRoleDropdownOption(newRoleKey, name, title, limit);
  renderTeamRoster();
  closeAddUserModal();
  showToast(`✅ ${name} added as a selectable persona (inherits ${baseRole ? baseRole.title : baseRoleKey} permissions). Select them from the role switcher in the header to log in as them.`, "success");
}

function removeTeamUser(userId) {
  const user = TEAM_USERS.find(u => u.id === userId);
  if (!user) return;
  TEAM_USERS = TEAM_USERS.filter(u => u.id !== userId);
  renderTeamRoster();
  showToast(`🗑️ ${user.name} removed from the team roster.`, "info");
}

function populateResourceSelect() {
  const select = document.getElementById("userMasterResourceSelect");
  if (!select) return;
  select.innerHTML = RBAC_RESOURCES.map(r => `<option value="${r.key}">${r.label}</option>`).join("");
  select.value = userMasterSelectedResource;
}

function renderPermissionMatrixEditor() {
  const select = document.getElementById("userMasterResourceSelect");
  const container = document.getElementById("permissionMatrixEditorContainer");
  if (!select || !container) return;

  userMasterSelectedResource = select.value || userMasterSelectedResource;
  const resource = userMasterSelectedResource;
  const roleKeys = Object.keys(USER_ROLES_CONFIG);

  const headerCols = RBAC_ACTIONS.map(a => `<th style="text-align:center; text-transform:capitalize;">${a}</th>`).join("");
  const rows = roleKeys.map(roleKey => {
    const role = USER_ROLES_CONFIG[roleKey];
    const perms = PERMISSIONS_MATRIX[roleKey][resource];
    const cells = RBAC_ACTIONS.map(action => `
      <td style="text-align:center;">
        <input type="checkbox" class="rbac-editor-cb" data-role="${roleKey}" data-action="${action}" ${perms[action] ? "checked" : ""} style="width:16px; height:16px;">
      </td>`).join("");
    return `
      <tr>
        <td>${role.icon} <strong>${role.title}</strong></td>
        ${cells}
      </tr>`;
  }).join("");

  container.innerHTML = `
    <table class="data-table">
      <thead><tr><th>Role</th>${headerCols}</tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function savePermissionMatrixEditor() {
  if (currentUserRole !== "admin") {
    showToast("⛔ Only the System Administrator can edit permissions.", "danger");
    return;
  }

  const resource = userMasterSelectedResource;
  document.querySelectorAll(".rbac-editor-cb").forEach(cb => {
    const roleKey = cb.dataset.role;
    const action = cb.dataset.action;
    if (PERMISSIONS_MATRIX[roleKey] && PERMISSIONS_MATRIX[roleKey][resource]) {
      PERMISSIONS_MATRIX[roleKey][resource][action] = cb.checked;
    }
  });

  const resourceLabel = (RBAC_RESOURCES.find(r => r.key === resource) || {}).label || resource;
  showToast(`✅ Permissions for "${resourceLabel}" saved. Changes apply immediately across the app.`, "success");
}

function resetPermissionsMatrix() {
  if (currentUserRole !== "admin") {
    showToast("⛔ Only the System Administrator can reset permissions.", "danger");
    return;
  }
  PERMISSIONS_MATRIX = defaultPermissionsMatrix();
  renderPermissionMatrixEditor();
  showToast("↩️ Permission matrix reset to system defaults.", "info");
}

function switchQuoteIntelTab(tab) {
  quoteIntelActiveTab = tab;
  const tabRenewal = document.getElementById("qiTabRenewal");
  const tabCmp = document.getElementById("qiTabCompare");
  const panelRenewal = document.getElementById("qiPanelRenewal");
  const panelCmp = document.getElementById("qiPanelCompare");

  if (tabRenewal) tabRenewal.classList.toggle("active", tab === "renewal");
  if (tabCmp) tabCmp.classList.toggle("active", tab === "compare");
  if (panelRenewal) panelRenewal.style.display = tab === "renewal" ? "block" : "none";
  if (panelCmp) panelCmp.style.display = tab === "compare" ? "block" : "none";

  if (tab === "renewal") populateRenewalSelector();
  else populateCompareLobFilter();
}

/**
 * OLD vs NEW (RENEWAL) COMPARISON — this customer's prior policy already
 * held with us vs. the new quote being written now on this submission.
 * Distinct from cross-submission comparison below.
 */
function populateRenewalSelector() {
  const select = document.getElementById("renewalSubmissionSelect");
  if (!select) return;

  const withPriorPolicy = SUBMISSIONS_DATASET.filter(s => s.priorPolicy);
  select.innerHTML = `<option value="">Select submission...</option>` +
    withPriorPolicy.map(s => `<option value="${s.id}">${s.id} — ${s.insured} (${s.lobName})</option>`).join("");

  const resultEl = document.getElementById("renewalComparisonResult");
  if (resultEl) {
    resultEl.innerHTML = withPriorPolicy.length === 0
      ? `<div class="text-muted text-sm mt-2">No submissions currently have a prior policy on file.</div>`
      : "";
  }
}

function renderRenewalComparison() {
  const subId = document.getElementById("renewalSubmissionSelect").value;
  const resultEl = document.getElementById("renewalComparisonResult");
  if (!resultEl) return;
  if (!subId) { resultEl.innerHTML = ""; return; }

  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId);
  if (!sub || !sub.priorPolicy) {
    resultEl.innerHTML = `<div class="alert alert-warning" style="font-size:12.5px;">No prior policy on file for this submission.</div>`;
    return;
  }

  const prior = sub.priorPolicy;
  const newPremium = getSubmissionPremium(sub);
  const priorPremium = prior.premium;
  const delta = newPremium - priorPremium;
  const deltaPct = priorPremium > 0 ? Math.round((delta / priorPremium) * 100) : 0;

  // Match coverage lines between prior policy and new quote by line description
  const newCoverage = sub.coverageRows || [];
  const allLines = Array.from(new Set([...prior.coverageRows.map(c => c.line), ...newCoverage.map(c => c.line)]));
  const coverageRows = allLines.map(line => {
    const oldRow = prior.coverageRows.find(c => c.line === line);
    const newRow = newCoverage.find(c => c.line === line);
    return `
      <tr>
        <td>${line}</td>
        <td>${oldRow ? `${oldRow.limit} / ${oldRow.ded} ded / ${oldRow.prem}` : `<span class="text-muted">— not on prior policy —</span>`}</td>
        <td>${newRow ? `${newRow.limit} / ${newRow.ded} ded / ${newRow.prem}` : `<span class="text-muted">— dropped from new quote —</span>`}</td>
      </tr>`;
  }).join("");

  resultEl.innerHTML = `
    <div class="alert ${delta > 0 ? 'alert-warning' : 'alert-success'} mb-3" style="font-size:12.5px;">
      <i class="ph ${delta > 0 ? 'ph-trend-up' : 'ph-trend-down'}"></i>
      Premium ${delta > 0 ? 'increased' : delta < 0 ? 'decreased' : 'unchanged'} by <strong>$${Math.abs(delta).toLocaleString()} (${Math.abs(deltaPct)}%)</strong> vs. the prior policy — use this to explain renewal pricing changes to the customer.
    </div>
    <div class="card mb-3">
      <div class="card-header"><h3><i class="ph ph-arrows-clockwise"></i> ${sub.insured} — Prior Policy vs New Quote</h3></div>
      <div class="card-body p-0">
        <table class="data-table">
          <thead><tr><th></th><th>Prior Policy (${prior.policyNumber})</th><th>New Quote (${sub.quoteNo || sub.id})</th></tr></thead>
          <tbody>
            <tr><td><strong>Policy Period</strong></td><td>${prior.policyPeriod}</td><td>${sub.receivedAt || '—'} onward</td></tr>
            <tr><td><strong>Total Premium</strong></td><td class="font-mono">$${priorPremium.toLocaleString()}</td><td class="font-mono"><strong>$${newPremium.toLocaleString()}</strong></td></tr>
            <tr><td><strong>Loss Ratio</strong></td><td>${prior.lossRatio}</td><td class="text-muted">Pending renewal term</td></tr>
            <tr><td><strong>Claims</strong></td><td>${prior.claimsCount} — ${prior.claimsNote}</td><td class="text-muted">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3><i class="ph ph-list-checks"></i> Coverage Line Comparison</h3></div>
      <div class="card-body p-0">
        <table class="data-table">
          <thead><tr><th>Coverage Line</th><th>Prior Policy (Limit / Ded / Premium)</th><th>New Quote (Limit / Ded / Premium)</th></tr></thead>
          <tbody>${coverageRows}</tbody>
        </table>
      </div>
    </div>`;
}

/**
 * #3: MULTIPLE QUOTE COMPARISON — underwriters compare 2–3 submissions,
 * restricted to the SAME coverage type / line of business so the
 * comparison is meaningful (comparing trucking to trucking, not trucking
 * to property).
 */
function populateCompareLobFilter() {
  const select = document.getElementById("compareLobFilterSelect");
  if (!select) return;

  const lobMap = {};
  SUBMISSIONS_DATASET.forEach(s => { lobMap[s.lobKey] = s.lobName; });

  select.innerHTML = `<option value="">Select coverage type...</option>` +
    Object.keys(lobMap).map(key => `<option value="${key}">${lobMap[key]}</option>`).join("");

  selectedCompareIds = [];
  renderQuoteCompareSelector();
}

function renderQuoteCompareSelector() {
  const container = document.getElementById("quoteCompareSelector");
  const lobFilter = document.getElementById("compareLobFilterSelect")?.value || "";
  if (!container) return;

  if (!lobFilter) {
    container.innerHTML = `<div class="text-muted text-sm">Select a coverage type above to see comparable submissions.</div>`;
    return;
  }

  const candidates = SUBMISSIONS_DATASET.filter(s => s.lobKey === lobFilter);
  if (candidates.length < 2) {
    container.innerHTML = `<div class="alert alert-warning" style="font-size:12.5px;"><i class="ph ph-warning"></i> Only ${candidates.length} submission(s) exist for this coverage type — need at least 2 with the same coverage to compare.</div>`;
    return;
  }

  const rows = candidates.map(s => `
    <label style="display:flex; align-items:center; gap:8px; padding:6px 0; border-bottom:1px solid var(--color-border); font-size:12.5px;">
      <input type="checkbox" value="${s.id}" onchange="toggleCompareSelection('${s.id}', this.checked)" ${selectedCompareIds.includes(s.id) ? "checked" : ""} style="width:16px; height:16px;">
      <span style="flex:1;"><code class="font-mono">${s.id}</code> — ${s.insured} <span class="text-muted">(${s.underwriter || 'Unassigned'})</span></span>
      <strong class="font-mono">$${getSubmissionPremium(s).toLocaleString()}</strong>
    </label>`).join("");

  container.innerHTML = `<div style="max-height:280px; overflow-y:auto;">${rows}</div>`;
}

function toggleCompareSelection(id, checked) {
  if (checked) {
    if (!selectedCompareIds.includes(id)) selectedCompareIds.push(id);
    if (selectedCompareIds.length > 3) {
      showToast("You can compare a maximum of 3 quotes at once.", "warning");
      selectedCompareIds.shift();
      renderQuoteCompareSelector();
    }
  } else {
    selectedCompareIds = selectedCompareIds.filter(x => x !== id);
  }
}

function renderQuoteComparisonTable() {
  const resultEl = document.getElementById("quoteComparisonResult");
  if (!resultEl) return;

  if (selectedCompareIds.length < 2) {
    resultEl.innerHTML = `<div class="alert alert-warning" style="font-size:12.5px;"><i class="ph ph-warning"></i> Select at least 2 quotes to compare.</div>`;
    return;
  }

  const subs = selectedCompareIds.map(id => SUBMISSIONS_DATASET.find(s => s.id === id)).filter(Boolean);

  const lobKeys = new Set(subs.map(s => s.lobKey));
  if (lobKeys.size > 1) {
    resultEl.innerHTML = `<div class="alert alert-danger" style="font-size:12.5px;"><i class="ph ph-warning"></i> Selected submissions have different coverage types (${subs.map(s => s.lobName).join(", ")}). Comparison is only meaningful across the same coverage — please select submissions with matching coverage.</div>`;
    return;
  }

  const fields = [
    { label: "Submission ID", get: s => s.id },
    { label: "Customer", get: s => s.insured },
    { label: "Underwriter", get: s => s.underwriter || "Unassigned" },
    { label: "Line of Business", get: s => s.lobName },
    { label: "Quote Number", get: s => s.quoteNo || "—" },
    { label: "Quoted Premium", get: s => `$${getSubmissionPremium(s).toLocaleString()}` },
    { label: "Exposure Value", get: s => `$${(s.exposureVal || 0).toLocaleString()}` },
    { label: "Trust/Risk Score", get: s => getSubmissionTrustScore(s) },
    { label: "Priority", get: s => s.priority },
    { label: "Status", get: s => s.statusText },
    { label: "Current Stage", get: s => { const st = WORKFLOW_STEPS.find(w => w.step === (s.currentStep || 1)); return st ? st.title : "—"; } },
    { label: "Received", get: s => s.receivedAt || "—" }
  ];

  const headerCols = subs.map(s => `<th>${s.id}</th>`).join("");
  const bodyRows = fields.map(f => `
    <tr>
      <td><strong>${f.label}</strong></td>
      ${subs.map(s => `<td>${f.get(s)}</td>`).join("")}
    </tr>`).join("");

  resultEl.innerHTML = `
    <div class="alert alert-info mb-2" style="font-size:12.5px;"><i class="ph ph-info"></i> All selected submissions share the same coverage type: <strong>${subs[0].lobName}</strong>.</div>
    <div class="card">
      <div class="card-header"><h3><i class="ph ph-columns"></i> Side-by-Side Comparison</h3></div>
      <div class="card-body p-0">
        <table class="data-table">
          <thead><tr><th>Field</th>${headerCols}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
    </div>`;
}

// ============================================================================
// FEATURE #7: TRUST SCORE-BASED PREMIUM ADJUSTMENT
// ============================================================================
let premiumAdjustTargetId = null;

function openPremiumAdjustModal(subId) {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId) || SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (!sub) return;
  premiumAdjustTargetId = sub.id;

  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  const trustScore = getSubmissionTrustScore(sub);
  const currentPremium = getSubmissionPremium(sub);

  const modal = document.getElementById("premiumAdjustModal");
  const body = document.getElementById("premiumAdjustModalBody");
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="font-size:13px; margin-bottom:10px;">
      <strong>Submission:</strong> <code>${sub.id}</code> — ${sub.insured || "N/A"}
    </div>
    <div class="alert alert-info" style="font-size:12.5px; margin-bottom:14px;">
      <i class="ph ph-info"></i> Customer Trust/Risk Score: <strong>${trustScore} / 100</strong>. Your authority limit as ${roleConfig.title}: <strong>$${roleConfig.limit.toLocaleString()}</strong>.
    </div>
    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">Current Quoted Premium</label>
      <input type="text" class="form-control" value="$${currentPremium.toLocaleString()}" disabled>
    </div>
    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">New Premium</label>
      <div style="display:flex; align-items:center; gap:8px;">
        <span>$</span>
        <input type="number" id="premiumAdjustNewValue" class="form-control" value="${currentPremium}" min="0">
      </div>
      <p class="text-xs text-muted" style="margin-top:4px;">Must remain within your authorized limit ($${roleConfig.limit.toLocaleString()}).</p>
    </div>
    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">Reason for Adjustment <span style="color:var(--color-danger);">*</span></label>
      <textarea id="premiumAdjustReason" class="form-control" rows="3" placeholder="e.g. Trust score reflects 5-year clean loss history; adjusting premium down 8% per pricing guideline..."></textarea>
    </div>
    <div id="premiumAdjustHistory" class="text-xs text-muted"></div>
  `;

  const history = (sub.premiumAdjustments || []).slice().reverse();
  const historyEl = document.getElementById("premiumAdjustHistory");
  if (history.length && historyEl) {
    historyEl.innerHTML = `<strong>Adjustment History:</strong>` + history.map(h =>
      `<div>› ${h.at} — <strong>${h.by}</strong> changed $${h.oldPremium.toLocaleString()} → $${h.newPremium.toLocaleString()}: ${h.reason}</div>`
    ).join("");
  }

  modal.style.display = "flex";
}

function closePremiumAdjustModal() {
  const modal = document.getElementById("premiumAdjustModal");
  if (modal) modal.style.display = "none";
  premiumAdjustTargetId = null;
}

function submitPremiumAdjustment() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === premiumAdjustTargetId);
  if (!sub) return;

  if (!hasPermission("premiumAdjustment", "edit")) {
    denyPermission("premiumAdjustment", "edit");
    return;
  }

  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  const newValRaw = document.getElementById("premiumAdjustNewValue").value;
  const reason = document.getElementById("premiumAdjustReason").value.trim();
  const newPremium = parseInt(newValRaw, 10);

  if (!reason) {
    showToast("⛔ A reason is required to record a premium adjustment.", "danger");
    return;
  }
  if (isNaN(newPremium) || newPremium < 0) {
    showToast("⛔ Enter a valid premium amount.", "danger");
    return;
  }

  let isOverride = false;
  if (newPremium > roleConfig.limit) {
    if (hasPermission("premiumAdjustment", "override")) {
      isOverride = true;
    } else {
      showToast(`⛔ $${newPremium.toLocaleString()} exceeds your authorized limit of $${roleConfig.limit.toLocaleString()}. Escalate to a higher authority instead.`, "danger");
      return;
    }
  }

  const oldPremium = getSubmissionPremium(sub);
  if (!sub.premiumAdjustments) sub.premiumAdjustments = [];
  sub.premiumAdjustments.push({
    oldPremium,
    newPremium,
    reason,
    by: `${roleConfig.name} (${roleConfig.title})`,
    trustScoreAtAdjustment: getSubmissionTrustScore(sub),
    at: new Date().toISOString().slice(0, 16).replace("T", " "),
    isOverride
  });
  sub.currentPremium = newPremium;

  showToast(isOverride
    ? `⚡ OVERRIDE: Premium adjusted beyond standard authority: $${oldPremium.toLocaleString()} → $${newPremium.toLocaleString()} by ${roleConfig.name}. Override logged.`
    : `✅ Premium adjusted: $${oldPremium.toLocaleString()} → $${newPremium.toLocaleString()} by ${roleConfig.name}. Reason recorded.`, "success");
  closePremiumAdjustModal();

  // Refresh any visible views that display premium
  if (currentPage === "quote-intel") { renderQuoteCompareSelector(); renderRenewalComparison(); }
  refreshAuditLogIfVisible();
}

let ratingTransitionTimer = null;
let ratingTransitionInterval = null;
let ratingStartTime = 0;

function stopRatingTransition() {
  if (ratingTransitionTimer) {
    clearTimeout(ratingTransitionTimer);
    ratingTransitionTimer = null;
  }
  if (ratingTransitionInterval) {
    clearInterval(ratingTransitionInterval);
    ratingTransitionInterval = null;
  }
}

function startRatingTransition() {
  stopRatingTransition();

  const l1 = document.getElementById("ratingLoader1");
  const l2 = document.getElementById("ratingLoader2");
  const l3 = document.getElementById("ratingLoader3");

  const i1 = document.getElementById("ratingIcon1");
  const i2 = document.getElementById("ratingIcon2");
  const i3 = document.getElementById("ratingIcon3");

  const b1 = document.getElementById("ratingBadge1");
  const b2 = document.getElementById("ratingBadge2");
  const b3 = document.getElementById("ratingBadge3");

  const t1 = document.getElementById("ratingTitle1");
  const t2 = document.getElementById("ratingTitle2");
  const t3 = document.getElementById("ratingTitle3");

  const progressBar = document.getElementById("ratingProgressBar");
  const percentText = document.getElementById("ratingPercentText");
  const countdownText = document.getElementById("ratingCountdown");

  if (!l1 || !l2 || !l3) return;

  ratingStartTime = Date.now();

  l1.style.opacity = "1.0";
  l2.style.opacity = "0.5";
  l3.style.opacity = "0.5";

  i1.style.background = "#eff6ff"; i1.style.color = "#2563eb"; i1.innerHTML = `<i class="ph ph-spinner spin"></i>`;
  i2.style.background = "#f1f5f9"; i2.style.color = "#94a3b8"; i2.innerHTML = `<i class="ph ph-circle"></i>`;
  i3.style.background = "#f1f5f9"; i3.style.color = "#94a3b8"; i3.innerHTML = `<i class="ph ph-circle"></i>`;

  b1.className = "badge badge-primary font-mono text-xs"; b1.textContent = "In Progress";
  b2.className = "badge badge-light font-mono text-xs"; b2.textContent = "Queued";
  b3.className = "badge badge-light font-mono text-xs"; b3.textContent = "Queued";

  if (t1) { t1.style.fontWeight = "700"; t1.style.color = "#0f172a"; }
  if (t2) { t2.style.fontWeight = "600"; t2.style.color = "#64748b"; }
  if (t3) { t3.style.fontWeight = "600"; t3.style.color = "#64748b"; }

  if (progressBar) progressBar.style.width = "0%";
  if (percentText) percentText.textContent = "0%";
  if (countdownText) countdownText.textContent = "6.0s";

  ratingTransitionInterval = setInterval(() => {
    const elapsed = Date.now() - ratingStartTime;
    const remaining = Math.max(0, (6000 - elapsed) / 1000);
    const progress = Math.min(100, Math.round((elapsed / 6000) * 100));

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentText) percentText.textContent = `${progress}%`;
    if (countdownText) countdownText.textContent = `${remaining.toFixed(1)}s`;

    // Phase 1 -> Phase 2 Transition at 2.0s (Hitting rating engine -> Fetching data)
    if (elapsed >= 2000 && elapsed < 4000) {
      i1.style.background = "#dcfce7"; i1.style.color = "#16a34a"; i1.innerHTML = `<i class="ph ph-check-circle"></i>`;
      b1.className = "badge badge-success font-mono text-xs"; b1.textContent = "Passed";

      l2.style.opacity = "1.0";
      i2.style.background = "#eff6ff"; i2.style.color = "#2563eb"; i2.innerHTML = `<i class="ph ph-spinner spin"></i>`;
      b2.className = "badge badge-primary font-mono text-xs"; b2.textContent = "In Progress";
      if (t2) { t2.style.fontWeight = "700"; t2.style.color = "#0f172a"; }
    }

    // Phase 2 -> Phase 3 Transition at 4.0s (Fetching data -> Calculating)
    if (elapsed >= 4000) {
      i1.style.background = "#dcfce7"; i1.style.color = "#16a34a"; i1.innerHTML = `<i class="ph ph-check-circle"></i>`;
      b1.className = "badge badge-success font-mono text-xs"; b1.textContent = "Passed";

      i2.style.background = "#dcfce7"; i2.style.color = "#16a34a"; i2.innerHTML = `<i class="ph ph-check-circle"></i>`;
      b2.className = "badge badge-success font-mono text-xs"; b2.textContent = "Passed";

      l3.style.opacity = "1.0";
      i3.style.background = "#eff6ff"; i3.style.color = "#2563eb"; i3.innerHTML = `<i class="ph ph-spinner spin"></i>`;
      b3.className = "badge badge-primary font-mono text-xs"; b3.textContent = "In Progress";
      if (t3) { t3.style.fontWeight = "700"; t3.style.color = "#0f172a"; }
    }
  }, 50);

  // Overall 6-second delay -> automatic redirect to final step (Step 7: Quote & Bind)
  ratingTransitionTimer = setTimeout(() => {
    stopRatingTransition();

    if (i3) { i3.style.background = "#dcfce7"; i3.style.color = "#16a34a"; i3.innerHTML = `<i class="ph ph-check-circle"></i>`; }
    if (b3) { b3.className = "badge badge-success font-mono text-xs"; b3.textContent = "Calculated"; }
    if (progressBar) progressBar.style.width = "100%";
    if (percentText) percentText.textContent = "100%";
    if (countdownText) countdownText.textContent = "0.0s";

    const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
    if (sub) {
      if (!sub.completedSteps) sub.completedSteps = [];
      if (!sub.completedSteps.includes(6)) sub.completedSteps.push(6);
    }

    showToast("✨ Rating Engine calculation completed! Redirecting to Step 7 (Quote & Bind)...", "success");

    goToWorkflowStep(7);
  }, 6000);
}

/**
 * Workflow Stepper Navigator (Step 1 = Doc Ingestion -> Step 7 = Quote & Bind)
 */
function goToWorkflowStep(stepNum) {
  if (stepNum < 1) stepNum = 1;
  if (stepNum > WORKFLOW_STEPS.length) stepNum = WORKFLOW_STEPS.length;
  currentWorkflowStep = stepNum;

  const stepObj = WORKFLOW_STEPS.find(s => s.step === stepNum) || WORKFLOW_STEPS[0];
  currentScreenId = stepObj.id;

  // Handle Rating Engine Transition timer for Step 6
  if (stepNum === 6) {
    startRatingTransition();
  } else {
    stopRatingTransition();
  }

  // Make sure we are in workflow page view
  if (currentPage !== "workflow") {
    showWorkflowPage(stepNum);
    return;
  }

  // 1. Show target screen view & hide all other screen views
  document.querySelectorAll(".screen-view").forEach(s => s.classList.remove("active"));
  const targetScreen = document.getElementById(stepObj.id);
  if (targetScreen) {
    targetScreen.classList.add("active");
  }

  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  const completedList = sub && sub.completedSteps ? sub.completedSteps.filter(st => st <= 7) : [];

  // 2. Populate downstream screen data for active sub
  if (sub) renderAllDownstreamScreens(sub);

  // 3. Update Workflow Horizontal Stepper Bar (Completed vs Active vs Upcoming)
  const hItems = document.querySelectorAll("#workflowStepperBar .h-stepper-item");
  const hLines = document.querySelectorAll("#workflowStepperBar .h-stepper-line");

  hItems.forEach((item) => {
    const itemStep = parseInt(item.getAttribute("data-step"), 10);
    item.classList.remove("active", "completed", "upcoming");
    if (itemStep === stepNum) {
      item.classList.add("active");
      try {
        item.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      } catch (e) {}
    } else if (completedList.includes(itemStep)) {
      item.classList.add("completed");
    } else {
      item.classList.add("upcoming");
    }
  });

  hLines.forEach((line) => {
    const lineStep = parseInt(line.getAttribute("data-line"), 10);
    line.classList.remove("completed");
    if (completedList.includes(lineStep)) {
      line.classList.add("completed");
    }
  });

  // 4. Update Sidebar Step List (Completed vs Active)
  for (let s = 1; s <= WORKFLOW_STEPS.length; s++) {
    const sideItem = document.getElementById(`sideStep-${s}`);
    if (sideItem) {
      sideItem.classList.remove("active", "completed");
      if (s === stepNum) {
        sideItem.classList.add("active");
      } else if (completedList.includes(s)) {
        sideItem.classList.add("completed");
      }
    }
  }

  const sideRatio = document.getElementById("sidebarStepRatio");
  if (sideRatio) {
    sideRatio.textContent = `${completedList.length}/7 Done`;
  }

  // 5. Update Headers & Active Case Card
  if (sub) updateActiveCaseHeaders(sub);

  // 6. Update Bottom Navigation Footer
  updateBottomFooter(stepObj, sub);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Universal Screen Navigator (Handles screen-1, screen-2..8, and screen-9)
 */
function goToScreen(screenId) {
  if (screenId === "screen-1") {
    showIntakePage();
  } else if (screenId === "screen-9") {
    showArchivePage();
  } else {
    const stepObj = WORKFLOW_STEPS.find(s => s.id === screenId);
    if (stepObj) {
      showWorkflowPage(stepObj.step);
    }
  }
}

/**
 * Update Sidebar Active Case Card, Top Header Workflow Pill & Top Workflow Banner
 */
function updateActiveCaseHeaders(sub) {
  if (!sub) return;
  const completedList = (sub.completedSteps || []).filter(st => st <= 7);
  const pct = Math.round((completedList.length / 7) * 100);

  // Top Header Case Workflow Pill
  const hCase = document.getElementById("headerActiveCaseSub");
  const hBadge = document.getElementById("headerActiveCaseBadge");
  if (hCase) hCase.textContent = sub.insured;
  if (hBadge) hBadge.textContent = sub.id;

  // Sidebar widget
  const sideSubName = document.getElementById("sidebarNavActiveCaseSub");
  const sideSubBadge = document.getElementById("sidebarActiveCaseBadge");
  const sideCardSubId = document.getElementById("sideCardSubId");
  const sideCardInsured = document.getElementById("sideCardInsured");
  const sideCardLob = document.getElementById("sideCardLob");
  const sideCardPriority = document.getElementById("sideCardPriority");
  const sideCardProgressText = document.getElementById("sideCardProgressText");
  const sideCardProgressBar = document.getElementById("sideCardProgressBar");

  if (sideSubName) sideSubName.textContent = sub.insured;
  if (sideSubBadge) sideSubBadge.textContent = sub.id;
  if (sideCardSubId) sideCardSubId.textContent = sub.id;
  if (sideCardInsured) sideCardInsured.textContent = sub.insured;
  if (sideCardLob) sideCardLob.textContent = sub.lobName.split(' ')[0];
  if (sideCardPriority) {
    sideCardPriority.textContent = `${sub.priority} SLA`;
    sideCardPriority.className = `badge ${sub.priority === 'P1' ? 'badge-danger' : (sub.priority === 'P2' ? 'badge-warning' : 'badge-info')} text-xs`;
  }
  if (sideCardProgressText) sideCardProgressText.textContent = `${pct}%`;
  if (sideCardProgressBar) sideCardProgressBar.style.width = `${pct}%`;

  // Workflow Top Header Bar
  const wfInsured = document.getElementById("wfHeaderInsured");
  const wfSubId = document.getElementById("wfHeaderSubId");
  const wfLob = document.getElementById("wfHeaderLob");
  const wfFEIN = document.getElementById("wfHeaderFEIN");
  const wfChannel = document.getElementById("wfHeaderChannel");
  const wfDesk = document.getElementById("wfHeaderDesk");
  const wfPriority = document.getElementById("wfHeaderPriority");
  const wfExposure = document.getElementById("wfHeaderExposure");
  const wfStatus = document.getElementById("wfHeaderStatus");

  if (wfInsured) wfInsured.textContent = sub.insured;
  if (wfSubId) wfSubId.textContent = sub.id;
  if (wfLob) wfLob.textContent = sub.lobName;
  if (wfFEIN) wfFEIN.textContent = sub.fein;
  if (wfChannel) wfChannel.textContent = sub.channelType === 'broker' ? sub.broker : 'Direct Customer Portal';
  if (wfDesk) wfDesk.textContent = sub.desk || 'Specialty Underwriting Desk';
  if (wfPriority) {
    wfPriority.textContent = `${sub.priority} • ${sub.slaText}`;
    wfPriority.className = `val badge ${sub.priority === 'P1' ? 'badge-danger' : (sub.priority === 'P2' ? 'badge-warning' : 'badge-info')}`;
  }
  if (wfExposure) wfExposure.textContent = sub.exposure;
  if (wfStatus) {
    wfStatus.textContent = sub.statusText;
    wfStatus.className = `val badge ${sub.statusBadge || 'badge-primary'}`;
  }
}

/**
 * Update Bottom Workflow Navigation Footer (Step 1..7)
 */
function updateBottomFooter(stepObj, sub) {
  const footer = document.getElementById("workflowBottomFooter");
  const btnPrev = document.getElementById("btnPrevStep");
  const btnNext = document.getElementById("btnNextStep");
  const footerStepLabel = document.getElementById("footerStepLabel");
  const footerSubId = document.getElementById("footerSubId");
  const footerSubName = document.getElementById("footerSubName");

  if (!stepObj || !footer) return;

  // On Intake or Archive Page, hide the bottom footer
  if (currentPage !== "workflow") {
    footer.style.display = "none";
    document.body.classList.remove("has-bottom-footer");
    return;
  }

  // Show bottom footer for Workflow Steps
  footer.style.display = "flex";
  document.body.classList.add("has-bottom-footer");

  if (footerStepLabel) {
    footerStepLabel.innerHTML = `<strong>Step ${stepObj.step} of 7</strong>`;
  }
  if (sub) {
    const footerDocCount = document.getElementById("footerDocCount");
    if (footerDocCount && sub.docs) footerDocCount.textContent = sub.docs.length;
  }

  if (btnPrev) {
    btnPrev.disabled = false;
    btnPrev.classList.remove("disabled");
    if (stepObj.step === 1) {
      btnPrev.innerHTML = `<i class="ph ph-arrow-left"></i> Back to Intake`;
      btnPrev.onclick = () => showIntakePage();
    } else {
      const prevStep = WORKFLOW_STEPS.find(s => s.step === stepObj.step - 1);
      btnPrev.innerHTML = `<i class="ph ph-arrow-left"></i> Previous (${prevStep ? prevStep.shortTitle : 'Back'})`;
      btnPrev.onclick = goToPrevStep;
    }
  }

  if (btnNext) {
    btnNext.disabled = false;
    btnNext.classList.remove("disabled");
    if (stepObj.step === 7) {
      btnNext.innerHTML = `<i class="ph ph-check-circle text-success"></i> Finish & Return to Intake Queue`;
      btnNext.onclick = () => {
        showIntakePage();
        showToast("🎉 Policy Flow Complete! Returned to Submission Intake Queue.", "success");
      };
    } else {
      const nextStep = WORKFLOW_STEPS.find(s => s.step === stepObj.step + 1);
      btnNext.innerHTML = `Next: ${nextStep ? nextStep.shortTitle : 'Step ' + (stepObj.step + 1)} <i class="ph ph-arrow-right"></i>`;
      btnNext.onclick = goToNextStep;
    }
  }
}

/**
 * Step Forward in Workflow (1..7)
 */
// ============================================================================
// CONFIGURABLE REVIEW ROUTING RULES (Senior Underwriter / Manager review)
// ============================================================================
let REVIEW_ROUTING_RULES = {
  seniorPremiumThreshold: 2000000,
  managerPremiumThreshold: 10000000,
  trustScoreThreshold: 65,
  riskLevelTrigger: "high",          // 'high' | 'medium_high' | 'any'
  productsRequiringSeniorReview: ["Hazmat Trucking", "Environmental Liability", "Excess Umbrella"],
  overAuthorityForcesReview: true
};

function openReviewRoutingModal() {
  const modal = document.getElementById("reviewRoutingModal");
  if (!modal) return;

  const isAuthorized = currentUserRole === "admin";
  const notice = document.getElementById("reviewRoutingModalAuthNotice");
  const saveBtn = document.getElementById("saveReviewRoutingBtn");
  const inputs = modal.querySelectorAll("input, select");

  if (notice) notice.style.display = isAuthorized ? "none" : "flex";
  if (saveBtn) saveBtn.style.display = isAuthorized ? "inline-flex" : "none";
  inputs.forEach(el => { el.disabled = !isAuthorized; });

  document.getElementById("ruleSeniorPremiumThreshold").value = REVIEW_ROUTING_RULES.seniorPremiumThreshold;
  document.getElementById("ruleManagerPremiumThreshold").value = REVIEW_ROUTING_RULES.managerPremiumThreshold;
  document.getElementById("ruleTrustScoreThreshold").value = REVIEW_ROUTING_RULES.trustScoreThreshold;
  document.getElementById("ruleRiskLevelTrigger").value = REVIEW_ROUTING_RULES.riskLevelTrigger;
  document.getElementById("ruleProductsList").value = REVIEW_ROUTING_RULES.productsRequiringSeniorReview.join(", ");
  document.getElementById("ruleOverAuthorityForcesReview").checked = REVIEW_ROUTING_RULES.overAuthorityForcesReview;

  modal.style.display = "flex";
}

function closeReviewRoutingModal() {
  const modal = document.getElementById("reviewRoutingModal");
  if (modal) modal.style.display = "none";
}

function saveReviewRoutingRules() {
  if (currentUserRole !== "admin") {
    showToast("⛔ Only the System Administrator can edit Review Routing Rules.", "danger");
    return;
  }
  REVIEW_ROUTING_RULES.seniorPremiumThreshold = parseInt(document.getElementById("ruleSeniorPremiumThreshold").value, 10) || 0;
  REVIEW_ROUTING_RULES.managerPremiumThreshold = parseInt(document.getElementById("ruleManagerPremiumThreshold").value, 10) || 0;
  REVIEW_ROUTING_RULES.trustScoreThreshold = parseInt(document.getElementById("ruleTrustScoreThreshold").value, 10) || 0;
  REVIEW_ROUTING_RULES.riskLevelTrigger = document.getElementById("ruleRiskLevelTrigger").value;
  REVIEW_ROUTING_RULES.productsRequiringSeniorReview = document.getElementById("ruleProductsList").value
    .split(",").map(s => s.trim()).filter(Boolean);
  REVIEW_ROUTING_RULES.overAuthorityForcesReview = document.getElementById("ruleOverAuthorityForcesReview").checked;

  showToast("✅ Review routing rules updated. New rules apply to all future stage evaluations.", "success");
  closeReviewRoutingModal();
}

/**
 * Evaluate whether a submission requires Senior Underwriter or Manager
 * review, based on the currently configured REVIEW_ROUTING_RULES rather
 * than a single hard-coded authority check.
 */
function determineReviewRequirement(sub) {
  const reasons = [];
  let level = "none";

  const premium = sub.exposureVal || 0;
  const trustScore = (typeof sub.trustScore === "number") ? sub.trustScore : 75; // default when not modeled on this record
  const riskLevel = sub.riskLevel || "medium";
  const product = sub.lobName || "";

  if (REVIEW_ROUTING_RULES.overAuthorityForcesReview && premium > sub.authorityLimit) {
    reasons.push(`Exposure ($${premium.toLocaleString()}) exceeds underwriter's individual authority limit ($${sub.authorityLimit.toLocaleString()})`);
    level = "senior";
  }
  if (premium > REVIEW_ROUTING_RULES.managerPremiumThreshold) {
    reasons.push(`Premium exceeds Manager review threshold ($${REVIEW_ROUTING_RULES.managerPremiumThreshold.toLocaleString()})`);
    level = "manager";
  } else if (premium > REVIEW_ROUTING_RULES.seniorPremiumThreshold) {
    reasons.push(`Premium exceeds Senior Underwriter review threshold ($${REVIEW_ROUTING_RULES.seniorPremiumThreshold.toLocaleString()})`);
    if (level !== "manager") level = "senior";
  }
  if (trustScore < REVIEW_ROUTING_RULES.trustScoreThreshold) {
    reasons.push(`Trust/risk score (${trustScore}) is below configured threshold (${REVIEW_ROUTING_RULES.trustScoreThreshold})`);
    if (level !== "manager") level = "senior";
  }
  const riskTriggers = REVIEW_ROUTING_RULES.riskLevelTrigger === "any"
    ? ["low", "medium", "high"]
    : (REVIEW_ROUTING_RULES.riskLevelTrigger === "medium_high" ? ["medium", "high"] : ["high"]);
  if (riskTriggers.includes(riskLevel)) {
    reasons.push(`Risk level "${riskLevel}" is flagged for mandatory review`);
    if (level !== "manager") level = "senior";
  }
  if (REVIEW_ROUTING_RULES.productsRequiringSeniorReview.some(p => product.toLowerCase().includes(p.toLowerCase()))) {
    reasons.push(`Product "${product}" is on the mandatory Senior review list`);
    if (level !== "manager") level = "senior";
  }

  return { required: level !== "none", level, reasons };
}

// ============================================================================
// HUMAN DECISION GATE AT MAJOR STAGES (#6)
// ============================================================================
// Steps considered "major" gates: 2 (Clearance), 4 (UW Review), 5 (Authority
// & Referral), 7 (Quote & Bind). The system performs automated checks, but
// a human must explicitly approve before the submission advances.
const MAJOR_DECISION_STEPS = [2, 4, 5, 7];
let pendingStageAdvance = null;

function stepRequiresHumanDecision(stepNum) {
  return MAJOR_DECISION_STEPS.includes(stepNum);
}

function openStageDecisionModal(sub, currentStep) {
  const modal = document.getElementById("stageDecisionModal");
  const body = document.getElementById("stageDecisionModalBody");
  const titleEl = document.getElementById("stageDecisionModalTitle");
  if (!modal || !body) return;

  const stepObj = WORKFLOW_STEPS.find(s => s.step === currentStep);
  titleEl.textContent = `Human Decision Required: ${stepObj ? stepObj.title : "Stage " + currentStep}`;

  let extra = "";
  if (currentStep === 5) {
    const review = determineReviewRequirement(sub);
    extra = review.required
      ? `<div class="alert alert-warning" style="font-size:12.5px;"><i class="ph ph-warning"></i> <strong>${review.level === "manager" ? "Manager" : "Senior Underwriter"} review required</strong> based on configured routing rules:<ul style="margin:6px 0 0 18px;">${review.reasons.map(r => `<li>${r}</li>`).join("")}</ul></div>`
      : `<div class="alert alert-success" style="font-size:12.5px;"><i class="ph ph-check"></i> No routing rules were triggered — this case does not require additional Senior/Manager review and can proceed on standard authority.</div>`;
  }

  body.innerHTML = `
    <div class="decision-submission-card">
      <div>
        <div class="label">Submission</div>
        <div class="value">${sub.insuredName || sub.channelName || "N/A"}</div>
      </div>
      <span class="badge badge-light"><i class="ph ph-hash"></i> ${sub.id}</span>
    </div>
    <div class="alert alert-info" style="font-size:12.5px;">
      <i class="ph ph-info"></i> Review the results below before making your decision.
    </div>
    ${extra}
  `;

  pendingStageAdvance = { sub, currentStep };
  modal.style.display = "flex";
}

function closeStageDecisionModal() {
  const modal = document.getElementById("stageDecisionModal");
  if (modal) modal.style.display = "none";
  pendingStageAdvance = null;
}

function submitStageDecision(approved) {
  if (!pendingStageAdvance) return;

  if (approved && !hasPermission("workflow", "approve")) {
    denyPermission("workflow", "approve");
    return;
  }

  const { sub, currentStep } = pendingStageAdvance;
  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  const notes = document.getElementById("stageDecisionNotes").value.trim();

  if (!sub.decisionLog) sub.decisionLog = [];
  sub.decisionLog.push({
    step: currentStep,
    decision: approved ? "approved" : "rejected",
    by: `${roleConfig.name} (${roleConfig.title})`,
    at: new Date().toISOString().slice(0, 16).replace("T", " "),
    notes: notes || null
  });

  closeStageDecisionModal();
  document.getElementById("stageDecisionNotes").value = "";
  refreshAuditLogIfVisible();

  if (approved) {
    showToast(`✅ Decision recorded: ${roleConfig.name} approved Step ${currentStep}. Advancing submission.`, "success");
    advanceWorkflowStepAfterDecision(currentStep);
  } else {
    showToast(`⛔ Decision recorded: ${roleConfig.name} rejected Step ${currentStep}. Submission held for rework.`, "warning");
  }
}

function advanceWorkflowStepAfterDecision(currentStep) {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (sub) {
    if (!sub.completedSteps) sub.completedSteps = [];
    if (!sub.completedSteps.includes(currentStep)) sub.completedSteps.push(currentStep);
    sub.currentStep = currentStep + 1;

    if (sub.currentStep === 2) sub.statusText = "Clearance Check";
    else if (sub.currentStep === 3) sub.statusText = "Data Enrichment";
    else if (sub.currentStep === 4) { sub.statusText = "UW Review"; sub.statusBadge = "badge-info"; }
    else if (sub.currentStep === 5 && (sub.exposureVal > sub.authorityLimit)) { sub.statusText = "Senior Referral"; sub.statusBadge = "badge-warning"; }
    else if (sub.currentStep === 6) { sub.statusText = "Ready for Rating"; sub.statusBadge = "badge-success"; }
    else if (sub.currentStep === 7) { sub.statusText = "Quote Generated"; sub.statusBadge = "badge-success"; }
  }

  goToWorkflowStep(currentStep + 1);
  const nextStepObj = WORKFLOW_STEPS.find(s => s.step === currentStep + 1);
  showToast(`Step ${currentStep} Completed! Proceeding to Step ${currentStep + 1}: ${nextStepObj ? nextStepObj.shortTitle : ''}`, "success");
  refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
}

function goToNextStep() {
  const currentStep = currentWorkflowStep;
  if (currentStep < WORKFLOW_STEPS.length) {
    const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);

    if (!hasPermission("workflow", "approve")) {
      denyPermission("workflow", "approve");
      return;
    }

    if (stepRequiresHumanDecision(currentStep) && sub) {
      openStageDecisionModal(sub, currentStep);
      return; // Wait for explicit human approve/reject via the modal
    }

    if (sub) {
      if (!sub.completedSteps) sub.completedSteps = [];
      if (!sub.completedSteps.includes(currentStep)) {
        sub.completedSteps.push(currentStep);
      }
      sub.currentStep = currentStep + 1;

      // Update lifecycle status label if advancing
      if (sub.currentStep === 2) sub.statusText = "Clearance Check";
      else if (sub.currentStep === 3) sub.statusText = "Data Enrichment";
      else if (sub.currentStep === 4) { sub.statusText = "UW Review"; sub.statusBadge = "badge-info"; }
      else if (sub.currentStep === 5 && (sub.exposureVal > sub.authorityLimit)) { sub.statusText = "Senior Referral"; sub.statusBadge = "badge-warning"; }
      else if (sub.currentStep === 6) { sub.statusText = "Ready for Rating"; sub.statusBadge = "badge-success"; }
      else if (sub.currentStep === 7) { sub.statusText = "Quote Generated"; sub.statusBadge = "badge-success"; }
    }

    goToWorkflowStep(currentStep + 1);
    const nextStepObj = WORKFLOW_STEPS.find(s => s.step === currentStep + 1);
    showToast(`Step ${currentStep} Completed! Proceeding to Step ${currentStep + 1}: ${nextStepObj ? nextStepObj.shortTitle : ''}`, "success");
    refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
  } else {
    showIntakePage();
    showToast("🎉 Policy Flow Complete! Returned to Submission Intake Queue.", "success");
  }
}

/**
 * Step Backward in Workflow
 */
function goToPrevStep() {
  if (currentWorkflowStep > 1) {
    goToWorkflowStep(currentWorkflowStep - 1);
  } else {
    showIntakePage();
  }
}

function navigateStep(direction) {
  if (direction > 0) {
    goToNextStep();
  } else {
    goToPrevStep();
  }
}

function navigateStep(direction) {
  if (direction > 0) {
    goToNextStep();
  } else {
    goToPrevStep();
  }
}

// ============================================================================
// 5. SCREEN 1: SUBMISSIONS TABLE & PRIORITY QUEUE WORKSPACE
// ============================================================================
function renderSubmissionsTable() {
  const tbody = document.getElementById("submissionsTableBody");
  if (!tbody) return;

  // 1. Filter dataset by selected LOB from LOB Switcher
  const filteredByLOB = SUBMISSIONS_DATASET.filter(sub => {
    return (currentLOBFilter === "all" || !currentLOBFilter) ? true : sub.lobKey === currentLOBFilter;
  });

  // 2. Filter by Channel Type tab (All / Broker / Direct / Referrals) and Search Query
  let filtered = filteredByLOB.filter(sub => {
    let matchChannel = true;
    if (currentTableFilter === "broker") matchChannel = sub.channelType === "broker";
    else if (currentTableFilter === "direct") matchChannel = sub.channelType === "direct";
    else if (currentTableFilter === "referral") matchChannel = sub.exposureVal > sub.authorityLimit || sub.statusText.includes("Referral") || sub.priority === "P1";

    const term = currentSearchTerm.toLowerCase();
    const matchSearch = term === "" || 
      sub.insured.toLowerCase().includes(term) ||
      sub.id.toLowerCase().includes(term) ||
      sub.fein.toLowerCase().includes(term) ||
      sub.broker.toLowerCase().includes(term) ||
      sub.lobName.toLowerCase().includes(term);
    return matchChannel && matchSearch;
  });

  // 3. Apply Queue Sorting (Priority / FIFO Arrival / Exposure)
  filtered.sort((a, b) => {
    if (currentQueueSort === "fifo") {
      return a.receivedTimestamp - b.receivedTimestamp; // Earliest timestamp first (First-In, First-Out)
    } else if (currentQueueSort === "exposure") {
      return b.exposureVal - a.exposureVal; // Highest exposure dollar value first
    } else {
      // Default: Priority & SLA (P1 > P2 > P3 > P4, then highest score)
      const pOrder = { "P1": 1, "P2": 2, "P3": 3, "P4": 4 };
      const diff = (pOrder[a.priority] || 99) - (pOrder[b.priority] || 99);
      if (diff !== 0) return diff;
      return b.priorityScore - a.priorityScore;
    }
  });

  // 4. Update summary metrics cards for the active LOB
  const total = filteredByLOB.length;
  const brokerCount = filteredByLOB.filter(s => s.channelType === "broker").length;
  const directCount = filteredByLOB.filter(s => s.channelType === "direct").length;
  const referralCount = filteredByLOB.filter(s => s.exposureVal > s.authorityLimit || s.statusText.includes("Referral") || s.priority === "P1").length;
  
  const elTotal = document.getElementById("countTotalSubs");
  const elBroker = document.getElementById("countBrokerSubs");
  const elDirect = document.getElementById("countDirectSubs");
  const elPipe = document.getElementById("countPipelineSubs");
  
  if (elTotal) elTotal.textContent = `${total} Case${total === 1 ? '' : 's'} (${currentLOBFilter.toUpperCase()})`;
  if (elBroker) elBroker.textContent = `${brokerCount} Submissions (${total > 0 ? Math.round((brokerCount/total)*100) : 0}%)`;
  if (elDirect) elDirect.textContent = `${directCount} Submissions (${total > 0 ? Math.round((directCount/total)*100) : 0}%)`;
  if (elPipe) elPipe.textContent = `${total} Normalized`;

  // 5. Update tab counts
  const tabAll = document.getElementById("tabFilterAll");
  const tabBroker = document.getElementById("tabFilterBroker");
  const tabDirect = document.getElementById("tabFilterDirect");
  const tabReferrals = document.getElementById("tabFilterReferrals");
  if (tabAll) tabAll.textContent = `All Submissions (${total})`;
  if (tabBroker) tabBroker.innerHTML = `<i class="ph ph-briefcase"></i> Broker Intake (${brokerCount})`;
  if (tabDirect) tabDirect.innerHTML = `<i class="ph ph-user"></i> Direct Customer (${directCount})`;
  if (tabReferrals) tabReferrals.innerHTML = `<i class="ph ph-user-check text-warning"></i> Senior Referrals (${referralCount})`;

  // 6. Render Table Rows
  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 24px; color: var(--text-muted);">
          <i class="ph ph-tray" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>
          No submissions found for the selected LOB filter and channel criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(sub => {
    const isSelected = sub.id === activeSubmissionId;
    const channelBadge = sub.channelType === "broker" 
      ? `<span class="channel-tag channel-broker"><i class="ph ph-briefcase"></i> ${sub.broker.split(' ')[0]} (Broker)</span>`
      : `<span class="channel-tag channel-direct"><i class="ph ph-user"></i> Direct Portal</span>`;

    const docChips = sub.docs.map((d, docIdx) => `
      <span class="doc-chip" onclick="event.stopPropagation(); previewDocForSubmission('${sub.id}', ${docIdx})" title="Click to Preview ${d.name} (PDF / Sheet)">
        <i class="ph ${d.type === 'pdf' ? 'ph-file-pdf text-danger' : 'ph-file-xls text-success'}"></i> 
        ${d.name.split('_')[0]} 
        <i class="ph ph-eye" style="font-size: 9px; opacity: 0.65; margin-left: 2px;"></i>
      </span>
    `).join("");

    // Priority badge class
    let pClass = "badge-priority-p3";
    let pIcon = "ph-clock";
    if (sub.priority === "P1") { pClass = "badge-priority-p1"; pIcon = "ph-fire"; }
    else if (sub.priority === "P2") { pClass = "badge-priority-p2"; pIcon = "ph-lightning"; }

    const isReferralCase = sub.exposureVal > sub.authorityLimit || sub.statusText.includes("Referral");
    const stepNum = sub.currentStep || 1;
    const stepObj = SCREEN_ORDER.find(s => s.num === stepNum) || SCREEN_ORDER[0];

    const actionBtn = (currentUserRole === "senior" && isReferralCase)
      ? `<button class="btn-action-view btn-action-referral" onclick="event.stopPropagation(); openCaseAtCurrentStep('${sub.id}');"><i class="ph ph-scales"></i> Review</button>`
      : `<button class="btn-action-view btn-action-primary" onclick="event.stopPropagation(); openCaseAtCurrentStep('${sub.id}');"><i class="ph ph-eye"></i> View</button>`;

    return `
      <tr class="${isSelected ? 'active-row' : ''} ${isReferralCase ? 'referral-row' : ''}" onclick="openCaseAtCurrentStep('${sub.id}')">
        <td>
          <span class="badge-priority ${pClass}">
            <i class="ph ${pIcon}"></i> ${sub.priority} • ${sub.slaText.split(' ')[0]}
          </span>
        </td>
        <td><strong class="font-mono text-primary">${sub.id}</strong></td>
        <td>${channelBadge}</td>
        <td>
          <strong>${sub.insured}</strong>
          ${isReferralCase ? '<span class="badge badge-warning text-xs" style="font-size: 10px; margin-left: 4px;"><i class="ph ph-user"></i> Referral</span>' : ''}
          <div class="text-secondary text-sm">FEIN: ${sub.fein} • Score: ${sub.priorityScore}/100</div>
          ${sub.underwriter ? `<div class="text-xs text-muted"><i class="ph ph-user-circle"></i> ${sub.underwriter}</div>` : ''}
        </td>
        <td><span class="badge badge-light">${sub.lobName}</span></td>
        <td>
          <button class="btn-table-docs" onclick="event.stopPropagation(); openDocsManagerModal('${sub.id}');" title="Click to view all ${sub.docs ? sub.docs.length : 0} attached documents & PDF previews">
            <i class="ph ph-folder-open text-primary"></i>
            <span>View Docs</span>
            <span class="doc-badge-count">${sub.docs ? sub.docs.length : 0}</span>
          </button>
        </td>
        <td>
          ${(() => {
            const vCount = getSubmissionDataVersionCount(sub);
            const missingCount = getOutstandingMissingCount(sub);
            return `<button class="btn-table-docs" onclick="event.stopPropagation(); openSubmissionVersionHistoryModal('${sub.id}');" title="Click to view submission data version history${missingCount > 0 ? ` — ${missingCount} item(s) still outstanding` : ''}">
                  <i class="ph ph-stack text-primary"></i>
                  <span>Versions</span>
                  <span class="doc-badge-count">${vCount}</span>
                  ${missingCount > 0 ? `<span class="badge badge-danger" style="font-size:9px; margin-left:4px;">${missingCount} Missing</span>` : ''}
                </button>`;
          })()}
        </td>
        <td>
          <small class="text-muted"><i class="ph ph-clock"></i> ${sub.receivedAt.split(' ')[1]} ${sub.receivedAt.split(' ')[2]}</small>
        </td>
        <td>
          <span class="badge ${sub.statusBadge}">${sub.statusText}</span>
        </td>
        <td style="text-align: right;">
          ${actionBtn}
        </td>
      </tr>
    `;
  }).join("");
}

function filterSubmissionsTable(filterType) {
  currentTableFilter = filterType;
  const tabAll = document.getElementById("tabFilterAll");
  const tabBroker = document.getElementById("tabFilterBroker");
  const tabDirect = document.getElementById("tabFilterDirect");
  const tabReferrals = document.getElementById("tabFilterReferrals");

  if (tabAll) tabAll.classList.toggle("active", filterType === "all");
  if (tabBroker) tabBroker.classList.toggle("active", filterType === "broker");
  if (tabDirect) tabDirect.classList.toggle("active", filterType === "direct");
  if (tabReferrals) tabReferrals.classList.toggle("active", filterType === "referral");

  renderSubmissionsTable();
}

function searchSubmissionsTable() {
  const input = document.getElementById("tableSearchInput");
  currentSearchTerm = input ? input.value : "";
  renderSubmissionsTable();
}

function selectSubmission(id, autoNavigate = false) {
  activeSubmissionId = id;
  const sub = SUBMISSIONS_DATASET.find(s => s.id === id);
  if (!sub) return;

  // Sync Top Header & LOB selector if needed
  const subName = document.getElementById("activeSubName");
  const subLOB = document.getElementById("activeSubLOBBadge");
  const subId = document.getElementById("activeSubIdBadge");
  const lobSelect = document.getElementById("lobSelect");

  if (subName) subName.textContent = sub.insured;
  if (subLOB) subLOB.textContent = sub.lobName.split(' ')[0];
  if (subId) subId.textContent = sub.id;
  
  if (lobSelect && currentLOBFilter !== "all" && lobSelect.value !== sub.lobKey) {
    lobSelect.value = sub.lobKey;
    currentLOBFilter = sub.lobKey;
  }

  // Update Screen 1 Selected Detail Card
  const dTitle = document.getElementById("detailInsuredTitle");
  const dChan = document.getElementById("detailChannelBadge");
  const dName = document.getElementById("detailInsuredName");
  const dFein = document.getElementById("detailFEIN");
  const dOrigin = document.getElementById("detailOriginType");
  const dEmail = document.getElementById("detailSubmitterEmail");
  const dLob = document.getElementById("detailLOBName");

  if (dTitle) dTitle.textContent = `${sub.insured} (${sub.id})`;
  if (dChan) dChan.textContent = sub.channelName;
  if (dName) dName.textContent = sub.insured;
  if (dFein) dFein.textContent = sub.fein;
  if (dOrigin) dOrigin.textContent = sub.channelType === 'broker' ? `Broker Submission (${sub.broker})` : "Direct Insured Customer Self-Service Portal";
  if (dEmail) dEmail.textContent = sub.email;
  if (dLob) dLob.textContent = sub.lobName;

  // Render docs list in detail card
  const docContainer = document.getElementById("detailDocList");
  if (docContainer) {
    docContainer.innerHTML = sub.docs.map((d, docIdx) => `
      <div class="doc-item" onclick="previewDocModal(${docIdx}, '${sub.id}')" style="cursor:pointer;">
        <div class="doc-icon ${d.type}"><i class="ph ${d.type === 'pdf' ? 'ph-file-pdf' : 'ph-file-xls'}"></i></div>
        <div class="doc-details">
          <span class="doc-name">${d.name}</span>
          <span class="doc-meta">${d.desc} • <span class="tag-ready">Normalized</span></span>
        </div>
        <button class="btn-icon" title="View Document" onclick="event.stopPropagation(); previewDocModal(${docIdx}, '${sub.id}')"><i class="ph ph-eye"></i></button>
      </div>
    `).join("");
  }

  // Refresh Table highlights
  renderSubmissionsTable();

  // Populate all downstream screens for this submission (Enrichment, OCR, Rating, PDF)
  renderAllDownstreamScreens(sub);

  if (autoNavigate) {
    goToScreen("screen-2");
    showToast(`Loaded ${sub.insured} into Document Ingestion Pipeline (Screen 2)!`, "success");
  }
}

// Direct Step Flow Navigation: Open case directly at its completed / current workflow step
function openCaseAtCurrentStep(id) {
  selectSubmission(id, false);
  const sub = SUBMISSIONS_DATASET.find(s => s.id === id);
  if (!sub) return;

  const targetStep = sub.currentStep || 1;
  showWorkflowPage(targetStep);
  showToast(`📂 Loaded Case: ${sub.insured} (${sub.id}) at Step ${targetStep}: ${WORKFLOW_STEPS[targetStep - 1].shortTitle}!`, "success");
}

function viewCase(id) {
  openCaseAtCurrentStep(id);
}

function resumeCaseFlow(id) {
  openCaseAtCurrentStep(id);
}

function resumeActiveCaseWorkflow() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  const targetStep = (sub && sub.currentStep) ? sub.currentStep : 1;
  showWorkflowPage(targetStep);
}

// Modal: View Case Details & Pre-Normalization Inspection
function openViewCaseModal(id) {
  activeSubmissionId = id;
  const sub = SUBMISSIONS_DATASET.find(s => s.id === id);
  if (!sub) return;

  // Sync underlying state
  selectSubmission(id, false);

  // Populate View Case Details Modal
  const mTitle = document.getElementById("modalDetailInsuredTitle");
  const mChan = document.getElementById("modalDetailChannelBadge");
  const mName = document.getElementById("modalDetailInsuredName");
  const mFein = document.getElementById("modalDetailFEIN");
  const mOrigin = document.getElementById("modalDetailOriginType");
  const mEmail = document.getElementById("modalDetailSubmitterEmail");
  const mLob = document.getElementById("modalDetailLOBName");
  const mDate = document.getElementById("modalDetailEffectiveDate");
  const mPriority = document.getElementById("modalDetailPriority");

  if (mTitle) mTitle.textContent = `${sub.insured} (${sub.id})`;
  if (mChan) mChan.textContent = sub.channelName;
  if (mName) mName.textContent = sub.insured;
  if (mFein) mFein.textContent = sub.fein;
  if (mOrigin) mOrigin.textContent = sub.channelType === 'broker' ? `Broker Submission (${sub.broker})` : "Direct Insured Customer Self-Service Portal";
  if (mEmail) mEmail.textContent = sub.email;
  if (mLob) mLob.textContent = sub.lobName;
  if (mDate) mDate.textContent = "2026-09-01 (12 Months)";
  if (mPriority) {
    mPriority.className = sub.priority === 'P1' ? 'text-danger font-bold' : (sub.priority === 'P2' ? 'text-warning font-bold' : 'text-primary font-bold');
    mPriority.textContent = `${sub.priority} - ${sub.priority === 'P1' ? 'Highest' : (sub.priority === 'P2' ? 'High' : 'Standard FIFO')} (${sub.slaText})`;
  }

  // Render docs list in modal with clickable live preview triggers
  const modalDocContainer = document.getElementById("modalDetailDocList");
  if (modalDocContainer) {
    modalDocContainer.innerHTML = sub.docs.map((d, docIdx) => `
      <div class="doc-item" onclick="previewDocModal(${docIdx})">
        <div class="doc-icon ${d.type}"><i class="ph ${d.type === 'pdf' ? 'ph-file-pdf' : 'ph-file-xls'}"></i></div>
        <div class="doc-details">
          <span class="doc-name">${d.name}</span>
          <span class="doc-meta">${d.desc} • <span class="tag-ready">Normalized</span></span>
        </div>
        <button class="btn btn-xs btn-outline" onclick="event.stopPropagation(); previewDocModal(${docIdx})" title="Preview Document PDF">
          <i class="ph ph-eye text-primary"></i> Preview
        </button>
      </div>
    `).join("");
  }

  // Show Modal
  const modal = document.getElementById("viewCaseModal");
  if (modal) modal.classList.add("active");
}

function closeViewCaseModal() {
  const modal = document.getElementById("viewCaseModal");
  if (modal) modal.classList.remove("active");
}

function resumeActiveCaseFlow() {
  closeViewCaseModal();
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (!sub) return;
  const targetStep = sub.currentStep || 1;
  showWorkflowPage(targetStep);
  showToast(`📂 Resumed ${sub.insured} directly at Step ${targetStep}: ${WORKFLOW_STEPS[targetStep - 1].shortTitle}!`, "success");
}

function proceedToNormalizationFromModal() {
  resumeActiveCaseFlow();
}

// Current Preview State
let currentPreviewSubId = null;
let currentPreviewDocIdx = 0;

function previewDocForSubmission(subId, docIdx = 0) {
  currentPreviewSubId = subId;
  previewDocModal(docIdx, subId);
}

function openAllDocsModal(subId) {
  const targetId = subId || activeSubmissionId;
  openDocsManagerModal(targetId, 0);
}

// Modal: Live Document Preview & Multi-Document PDF/Excel Viewer
function previewDocModal(docIdx = 0, subId = null) {
  const targetId = subId || currentPreviewSubId || activeSubmissionId;
  currentPreviewSubId = targetId;
  currentPreviewDocIdx = docIdx;

  const sub = SUBMISSIONS_DATASET.find(s => s.id === targetId);
  if (!sub || !sub.docs || !sub.docs[docIdx]) return;

  const doc = sub.docs[docIdx];
  const modalIcon = document.getElementById("docModalIcon");
  const modalTitle = document.getElementById("docModalTitle");
  const modalMeta = document.getElementById("docModalMeta");
  const modalBody = document.getElementById("docModalBody");
  const modalTabBar = document.getElementById("modalDocTabBar");
  const modalFooterNote = document.getElementById("docModalFooterNote");

  if (modalTitle) modalTitle.textContent = doc.name;
  if (modalMeta) modalMeta.textContent = `Case: ${sub.insured} (${sub.id}) • ${doc.desc} • Normalized & OCR-Ready`;

  if (modalIcon) {
    modalIcon.className = `doc-icon ${doc.type}`;
    modalIcon.innerHTML = `<i class="ph ${doc.type === 'pdf' ? 'ph-file-pdf' : 'ph-file-xls'}"></i>`;
    if (doc.type === 'pdf') {
      modalIcon.style.background = "#fee2e2";
      modalIcon.style.color = "#dc2626";
    } else {
      modalIcon.style.background = "#dcfce7";
      modalIcon.style.color = "#16a34a";
    }
  }

  // Populate Document Tabs Bar to switch between all attached documents
  if (modalTabBar && sub.docs) {
    modalTabBar.innerHTML = sub.docs.map((d, i) => `
      <button class="modal-doc-tab-btn ${i === docIdx ? 'active' : ''}" onclick="previewDocModal(${i}, '${sub.id}')">
        <i class="ph ${d.type === 'pdf' ? 'ph-file-pdf text-danger' : 'ph-file-xls text-success'}"></i>
        <span>${d.name.length > 28 ? d.name.substring(0, 26) + '...' : d.name}</span>
      </button>
    `).join("");
  }

  if (modalFooterNote) {
    modalFooterNote.innerHTML = `<i class="ph ph-check-circle text-success"></i> Attached to <strong>${sub.insured}</strong> (${sub.id}) • Format: ${doc.type.toUpperCase()} • Schema Validated.`;
  }

  if (!modalBody) return;

  // Render authentic document preview based on doc name / type
  if (doc.name.toLowerCase().includes("handwritten")) {
    modalBody.innerHTML = `
      <div class="doc-preview-sheet">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px;">
          <div>
            <h4 style="margin: 0; font-size: 16px; color: #0f172a;"><i class="ph ph-file-pdf text-danger"></i> HANDWRITTEN BROKER COVER NOTE (SCANNED)</h4>
            <span class="text-secondary text-sm">Insured: ${sub.insured} • Attached by ${sub.broker || 'Submitting Party'}</span>
          </div>
          <span class="badge badge-warning">Requires Manual OCR Review</span>
        </div>

        <div class="handwritten-note-paper">
          <div class="handwritten-note-text">
            <p>To Underwriting Desk,</p>
            <p>Please find attached the submission for <strong>${sub.insured}</strong>
            (${sub.id}) — ${sub.lobName}. Insured is a solid, long-standing account of ours,
            good payment history, no major concerns from our side.</p>
            <p>Effective date requested 09/01. Kindly fast-track if possible, client is
            eager to bind before renewal lapses. Loss runs &amp; SOV attached separately.</p>
            <p>Call me if anything's missing.</p>
            <p class="handwritten-note-signoff">— ${(sub.broker || 'Broker').split(' ')[0]} Desk</p>
          </div>
        </div>

        <div style="margin-top: 16px; padding: 12px; background: #fffbeb; border-radius: 6px; border: 1px solid #fde68a; display: flex; justify-content: space-between; align-items: center;">
          <div class="text-sm">
            <i class="ph ph-warning text-warning"></i> Handwritten source document — not machine-OCR'd. Route to Clearance for manual data verification.
          </div>
          <div class="text-sm font-mono text-muted">Scanned ${sub.receivedAt}</div>
        </div>
      </div>
    `;
  } else if (doc.name.toLowerCase().includes("acord") || doc.name.toLowerCase().includes("app")) {
    modalBody.innerHTML = `
      <div class="doc-preview-sheet acord-pdf-sheet">
        <div class="acord-top-header">
          <div class="acord-logo-badge">
            <i class="ph ph-shield-check"></i> ACORD <strong>FORM</strong>
          </div>
          <div class="acord-form-title">
            <h4>Commercial Insurance Application</h4>
            <span>Standard ISO Certified Format • ${sub.lobName}</span>
          </div>
        </div>

        <div class="acord-section-box">
          <div class="acord-sec-title"><span>Section 1: Producer & Agency Information</span><span>Submission ID: ${sub.id}</span></div>
          <div class="acord-sec-grid">
            <div class="acord-field"><span class="lbl">Broker / Agency:</span><span class="val">${sub.broker}</span></div>
            <div class="acord-field"><span class="lbl">Producer Email:</span><span class="val font-mono">${sub.email}</span></div>
            <div class="acord-field"><span class="lbl">Channel Origin:</span><span class="val">${sub.channelName}</span></div>
          </div>
        </div>

        <div class="acord-section-box">
          <div class="acord-sec-title"><span>Section 2: Named Insured & Risk Profile</span><span>LOB: ${sub.lobName}</span></div>
          <div class="acord-sec-grid">
            <div class="acord-field"><span class="lbl">Legal Named Insured:</span><strong class="val">${sub.insured}</strong></div>
            <div class="acord-field"><span class="lbl">FEIN / Tax ID:</span><span class="val font-mono">${sub.fein}</span></div>
            <div class="acord-field"><span class="lbl">USDOT / Registration:</span><span class="val font-mono">${sub.dot || 'N/A'}</span></div>
            <div class="acord-field" style="grid-column: span 2;"><span class="lbl">Mailing Address:</span><span class="val">${sub.address}</span></div>
            <div class="acord-field"><span class="lbl">Target Effective Date:</span><span class="val">2026-09-01 (12 Months)</span></div>
          </div>
        </div>

        <div class="acord-section-box">
          <div class="acord-sec-title"><span>Section 3: Scheduled Coverages & Limits Requested</span><span>Binding Authority Limit: $${(sub.authorityLimit/1000000).toFixed(1)}M</span></div>
          <table class="excel-sheet-table" style="margin: 0;">
            <thead>
              <tr>
                <th>Coverage Line</th>
                <th>Requested Limit</th>
                <th>Deductible</th>
                <th>Estimated Premium</th>
              </tr>
            </thead>
            <tbody>
              ${sub.coverageRows.map(c => `
                <tr>
                  <td><strong>${c.line}</strong></td>
                  <td>${c.limit}</td>
                  <td>${c.ded}</td>
                  <td class="font-mono font-bold">${c.prem}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="acord-section-box" style="margin-bottom: 0;">
          <div class="acord-sec-title"><span>Section 4: Electronic Signatures & Compliance Verification</span><span>ISO Verified</span></div>
          <div class="acord-sec-grid">
            <div class="acord-field"><span class="lbl">Applicant Signature:</span><span class="val">/s/ Authorized Officer (${sub.insured})</span></div>
            <div class="acord-field"><span class="lbl">Broker Stamp:</span><span class="val font-mono">BROKER-VERIFIED-CERT</span></div>
            <div class="acord-field"><span class="lbl">Timestamp:</span><span class="val">${sub.receivedAt}</span></div>
          </div>
        </div>
      </div>
    `;
  } else if (doc.type === "xls" || doc.name.toLowerCase().includes("sov") || doc.name.toLowerCase().includes("schedule")) {
    modalBody.innerHTML = `
      <div class="doc-preview-sheet">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px;">
          <div>
            <h4 style="margin: 0; font-size: 16px; color: #0f172a;"><i class="ph ph-file-xls text-success"></i> STATEMENT OF VALUES (SOV) & ASSET SCHEDULE</h4>
            <span class="text-secondary text-sm">Insured: ${sub.insured} • Line of Business: ${sub.lobName}</span>
          </div>
          <span class="badge badge-success">Schedule Normalized</span>
        </div>

        <table class="excel-sheet-table">
          <thead>
            <tr>
              <th>Item #</th>
              <th>Asset / Vehicle / Location Description</th>
              <th>Identifier / VIN / Class</th>
              <th>Territory / Location</th>
              <th>Stated Value / Exposure</th>
              <th>Safety Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>001</strong></td>
              <td>Primary Scheduled Unit / Facility A</td>
              <td class="font-mono">1FTNE31L8HDA89210</td>
              <td>Texas Core Operations Hub</td>
              <td class="font-mono font-bold">${sub.exposure}</td>
              <td><span class="badge badge-success">Verified Clear</span></td>
            </tr>
            <tr>
              <td><strong>002</strong></td>
              <td>Secondary Operational Support Asset</td>
              <td class="font-mono">1FTNE31L9HDA89211</td>
              <td>Regional Service Facility</td>
              <td class="font-mono font-bold">Included in Fleet Pool</td>
              <td><span class="badge badge-success">Verified Clear</span></td>
            </tr>
            <tr>
              <td><strong>003</strong></td>
              <td>Auxiliary Equipment & Contents</td>
              <td class="font-mono">EQUIP-SCHED-044</td>
              <td>Scheduled Terminals</td>
              <td class="font-mono font-bold">Full Replacement Cost</td>
              <td><span class="badge badge-info">Inspected</span></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4"><strong>TOTAL SCHEDULED EXPOSURE VALUATION:</strong></td>
              <td class="font-mono" style="color: var(--primary); font-size: 14px;"><strong>${sub.exposure}</strong></td>
              <td><span class="badge badge-primary">Within Appetite</span></td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  } else {
    // Loss Run Preview
    modalBody.innerHTML = `
      <div class="doc-preview-sheet">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px;">
          <div>
            <h4 style="margin: 0; font-size: 16px; color: #0f172a;"><i class="ph ph-file-pdf text-danger"></i> OFFICIAL CARRIER SIGNED LOSS RUN REPORT</h4>
            <span class="text-secondary text-sm">Insured: ${sub.insured} • Prior 3-Year Valuation as of 2026-08-01</span>
          </div>
          <span class="badge badge-primary">Carrier Signed Official</span>
        </div>

        <table class="excel-sheet-table">
          <thead>
            <tr>
              <th>Policy Year</th>
              <th>Claim Number</th>
              <th>Loss Description</th>
              <th>Status</th>
              <th>Paid Losses</th>
              <th>Total Incurred</th>
            </tr>
          </thead>
          <tbody>
            ${sub.losses.map((l, i) => `
              <tr>
                <td><strong>${l.year}</strong></td>
                <td class="font-mono">CLM-2026-${1000 + i * 42}</td>
                <td>${l.desc}</td>
                <td><span class="badge ${l.status === 'Clean' ? 'badge-success' : 'badge-info'}">${l.status}</span></td>
                <td class="font-mono">${l.incurred}</td>
                <td class="font-mono font-bold">${l.incurred}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="lbl" style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">3-Year Cumulative Loss Ratio:</span>
            <strong style="color: #15803d; font-size: 15px; margin-left: 8px;">18.4% (Highly Favorable)</strong>
          </div>
          <div class="text-sm font-mono text-muted">
            <i class="ph ph-stamp text-primary"></i> Certified Carrier Loss Audit
          </div>
        </div>
      </div>
    `;
  }

  const modal = document.getElementById("docPreviewModal");
  if (modal) modal.classList.add("active");
}

function downloadCurrentPreviewDoc() {
  const targetId = currentHubSubId || currentPreviewSubId || activeSubmissionId;
  const sub = SUBMISSIONS_DATASET.find(s => s.id === targetId);
  const docIdx = (currentHubDocIdx !== undefined && currentHubDocIdx !== null) ? currentHubDocIdx : (currentPreviewDocIdx || 0);
  const doc = sub && sub.docs ? sub.docs[docIdx] : null;
  const docName = doc ? doc.name : "document.pdf";
  showToast(`📥 Downloading "${docName}" for ${sub ? sub.insured : 'Case'}...`, "info");
}

function closeDocPreviewModal() {
  const modal = document.getElementById("docPreviewModal");
  if (modal) modal.classList.remove("active");
}

function proceedToNormalizationFromDocModal() {
  closeDocPreviewModal();
  closeViewCaseModal();
  const targetId = currentPreviewSubId || activeSubmissionId;
  const sub = SUBMISSIONS_DATASET.find(s => s.id === targetId);
  if (sub) {
    selectSubmission(sub.id, false);
    sub.currentStep = 1;
    if (sub.statusText.includes("Intake")) {
      sub.statusText = "Ingestion Pipeline";
    }
    renderSubmissionsTable();
    refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
  }
  showWorkflowPage(1);
  showToast(`✅ Loaded ${sub?.insured || 'Submission'} into Document Ingestion Pipeline (Step 1)!`, "success");
}

function printDocPreview() {
  window.print();
}

// ============================================================================
// CASE DOCUMENTS HUB & MULTI-PDF VIEWER MODAL
// ============================================================================
let currentHubSubId = null;
let currentHubDocIdx = 0;

function openDocsManagerModal(subId, docIdx = 0) {
  const targetId = subId || activeSubmissionId;
  currentHubSubId = targetId;
  currentHubDocIdx = docIdx;

  const sub = SUBMISSIONS_DATASET.find(s => s.id === targetId);
  if (!sub) return;

  const modal = document.getElementById("caseDocsModal");
  const title = document.getElementById("caseDocsModalTitle");
  const subtitle = document.getElementById("caseDocsModalSubtitle");
  const countEl = document.getElementById("caseDocsCount");
  const listContainer = document.getElementById("caseDocsListContainer");

  if (title) title.innerHTML = `Case Documents: <strong>${sub.insured}</strong>`;
  if (subtitle) subtitle.textContent = `Submission ID: ${sub.id} • ${sub.docs ? sub.docs.length : 0} Attached Files • Line of Business: ${sub.lobName}`;
  if (countEl) countEl.textContent = sub.docs ? sub.docs.length : 0;

  if (listContainer && sub.docs) {
    listContainer.innerHTML = sub.docs.map((d, i) => `
      <div class="doc-hub-card ${i === docIdx ? 'active' : ''}" onclick="switchHubDoc(${i})">
        <div class="doc-hub-card-header">
          <div class="doc-hub-card-icon ${d.type}">
            <i class="ph ${d.type === 'pdf' ? 'ph-file-pdf' : 'ph-file-xls'}"></i>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div class="doc-hub-card-title">${d.name}</div>
            <div class="doc-hub-card-meta">${d.desc}</div>
          </div>
        </div>
        <div class="doc-hub-card-actions">
          <span class="badge ${d.type === 'pdf' ? 'badge-primary' : 'badge-success'}" style="font-size: 9.5px;">${d.type.toUpperCase()} DOCUMENT</span>
          <button class="btn-preview-doc" onclick="event.stopPropagation(); switchHubDoc(${i})">
            <i class="ph ph-eye"></i> ${i === docIdx ? 'Viewing' : 'Preview'}
          </button>
          ${hasPermission('documents', 'edit') ? `
          <button class="btn-preview-doc" style="color:var(--color-danger);" onclick="event.stopPropagation(); confirmDeleteSubmissionDocument('${sub.id}', ${i})" title="Delete document">
            <i class="ph ph-trash"></i> Delete
          </button>` : ''}
        </div>
      </div>
    `).join("");
  }

  renderHubDocumentPreview(sub, docIdx);

  if (modal) modal.classList.add("active");
}

function deleteSubmissionDocument(subId, docIdx) {
  if (!hasPermission("documents", "edit")) {
    denyPermission("documents", "edit");
    return;
  }
  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId);
  if (!sub || !sub.docs || !sub.docs[docIdx]) return;

  const removed = sub.docs.splice(docIdx, 1)[0];
  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  showToast(`🗑️ "${removed.name}" deleted by ${roleConfig.name}.`, "success");

  renderSubmissionsTable();
  openDocsManagerModal(subId, 0);
}

function switchHubDoc(docIdx) {
  currentHubDocIdx = docIdx;
  const sub = SUBMISSIONS_DATASET.find(s => s.id === currentHubSubId);
  if (!sub) return;

  // Update card active states
  const cards = document.querySelectorAll(".doc-hub-card");
  cards.forEach((c, idx) => {
    if (idx === docIdx) {
      c.classList.add("active");
      const btn = c.querySelector(".btn-preview-doc");
      if (btn) btn.innerHTML = `<i class="ph ph-eye"></i> Viewing`;
    } else {
      c.classList.remove("active");
      const btn = c.querySelector(".btn-preview-doc");
      if (btn) btn.innerHTML = `<i class="ph ph-eye"></i> Preview`;
    }
  });

  renderHubDocumentPreview(sub, docIdx);
}

function renderHubDocumentPreview(sub, docIdx) {
  if (!sub || !sub.docs || !sub.docs[docIdx]) return;
  const doc = sub.docs[docIdx];

  const badge = document.getElementById("hubActiveDocBadge");
  const title = document.getElementById("hubActiveDocTitle");
  const meta = document.getElementById("hubActiveDocMeta");
  const viewer = document.getElementById("hubDocViewerContainer");

  if (badge) badge.textContent = doc.name.toLowerCase().includes("handwritten") ? "HANDWRITTEN NOTE" : (doc.name.toLowerCase().includes("acord") ? "ACORD APPLICATION" : (doc.type === "xls" ? "SOV SCHEDULE" : "LOSS RUN REPORT"));
  if (title) title.textContent = doc.name;
  if (meta) meta.textContent = doc.name.toLowerCase().includes("handwritten") ? `${doc.desc} • Status: Pending Manual OCR Review` : `${doc.desc} • Status: 100% Normalized`;

  if (!viewer) return;

  // Render authentic document preview HTML
  if (doc.name.toLowerCase().includes("handwritten")) {
    viewer.innerHTML = `
      <div class="doc-preview-sheet">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px;">
          <div>
            <h4 style="margin: 0; font-size: 16px; color: #0f172a;"><i class="ph ph-file-pdf text-danger"></i> HANDWRITTEN BROKER COVER NOTE (SCANNED)</h4>
            <span class="text-secondary text-sm">Insured: ${sub.insured} • Attached by ${sub.broker || 'Submitting Party'}</span>
          </div>
          <span class="badge badge-warning">Requires Manual OCR Review</span>
        </div>

        <div class="handwritten-note-paper">
          <div class="handwritten-note-text">
            <p>To Underwriting Desk,</p>
            <p>Please find attached the submission for <strong>${sub.insured}</strong>
            (${sub.id}) — ${sub.lobName}. Insured is a solid, long-standing account of ours,
            good payment history, no major concerns from our side.</p>
            <p>Effective date requested 09/01. Kindly fast-track if possible, client is
            eager to bind before renewal lapses. Loss runs &amp; SOV attached separately.</p>
            <p>Call me if anything's missing.</p>
            <p class="handwritten-note-signoff">— ${(sub.broker || 'Broker').split(' ')[0]} Desk</p>
          </div>
        </div>

        <div style="margin-top: 16px; padding: 12px; background: #fffbeb; border-radius: 6px; border: 1px solid #fde68a; display: flex; justify-content: space-between; align-items: center;">
          <div class="text-sm">
            <i class="ph ph-warning text-warning"></i> Handwritten source document — not machine-OCR'd. Route to Clearance for manual data verification.
          </div>
          <div class="text-sm font-mono text-muted">Scanned ${sub.receivedAt}</div>
        </div>
      </div>
    `;
  } else if (doc.name.toLowerCase().includes("acord") || doc.name.toLowerCase().includes("app")) {
    viewer.innerHTML = `
      <div class="doc-preview-sheet acord-pdf-sheet">
        <div class="acord-top-header">
          <div class="acord-logo-badge">
            <i class="ph ph-shield-check"></i> ACORD <strong>FORM</strong>
          </div>
          <div class="acord-form-title">
            <h4>Commercial Insurance Application</h4>
            <span>Standard ISO Certified Format • ${sub.lobName}</span>
          </div>
        </div>

        <div class="acord-section-box">
          <div class="acord-sec-title"><span>Section 1: Producer & Agency Information</span><span>Submission ID: ${sub.id}</span></div>
          <div class="acord-sec-grid">
            <div class="acord-field"><span class="lbl">Broker / Agency:</span><span class="val">${sub.broker}</span></div>
            <div class="acord-field"><span class="lbl">Producer Email:</span><span class="val font-mono">${sub.email}</span></div>
            <div class="acord-field"><span class="lbl">Channel Origin:</span><span class="val">${sub.channelName}</span></div>
          </div>
        </div>

        <div class="acord-section-box">
          <div class="acord-sec-title"><span>Section 2: Named Insured & Risk Profile</span><span>LOB: ${sub.lobName}</span></div>
          <div class="acord-sec-grid">
            <div class="acord-field"><span class="lbl">Legal Named Insured:</span><strong class="val">${sub.insured}</strong></div>
            <div class="acord-field"><span class="lbl">FEIN / Tax ID:</span><span class="val font-mono">${sub.fein}</span></div>
            <div class="acord-field"><span class="lbl">USDOT / Registration:</span><span class="val font-mono">${sub.dot || 'N/A'}</span></div>
            <div class="acord-field" style="grid-column: span 2;"><span class="lbl">Mailing Address:</span><span class="val">${sub.address}</span></div>
            <div class="acord-field"><span class="lbl">Target Effective Date:</span><span class="val">2026-09-01 (12 Months)</span></div>
          </div>
        </div>

        <div class="acord-section-box">
          <div class="acord-sec-title"><span>Section 3: Scheduled Coverages & Limits Requested</span><span>Binding Authority Limit: $${(sub.authorityLimit/1000000).toFixed(1)}M</span></div>
          <table class="excel-sheet-table" style="margin: 0;">
            <thead>
              <tr>
                <th>Coverage Line</th>
                <th>Requested Limit</th>
                <th>Deductible</th>
                <th>Estimated Premium</th>
              </tr>
            </thead>
            <tbody>
              ${sub.coverageRows.map(c => `
                <tr>
                  <td><strong>${c.line}</strong></td>
                  <td>${c.limit}</td>
                  <td>${c.ded}</td>
                  <td class="font-mono font-bold">${c.prem}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="acord-section-box" style="margin-bottom: 0;">
          <div class="acord-sec-title"><span>Section 4: Electronic Signatures & Compliance Verification</span><span>ISO Verified</span></div>
          <div class="acord-sec-grid">
            <div class="acord-field"><span class="lbl">Applicant Signature:</span><span class="val">/s/ Authorized Officer (${sub.insured})</span></div>
            <div class="acord-field"><span class="lbl">Broker Stamp:</span><span class="val font-mono">BROKER-VERIFIED-CERT</span></div>
            <div class="acord-field"><span class="lbl">Timestamp:</span><span class="val">${sub.receivedAt}</span></div>
          </div>
        </div>
      </div>
    `;
  } else if (doc.type === "xls" || doc.name.toLowerCase().includes("sov") || doc.name.toLowerCase().includes("schedule")) {
    viewer.innerHTML = `
      <div class="doc-preview-sheet">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px;">
          <div>
            <h4 style="margin: 0; font-size: 16px; color: #0f172a;"><i class="ph ph-file-xls text-success"></i> STATEMENT OF VALUES (SOV) & ASSET SCHEDULE</h4>
            <span class="text-secondary text-sm">Insured: ${sub.insured} • Line of Business: ${sub.lobName}</span>
          </div>
          <span class="badge badge-success">Schedule Normalized</span>
        </div>

        <table class="excel-sheet-table">
          <thead>
            <tr>
              <th>Item #</th>
              <th>Asset / Vehicle / Location Description</th>
              <th>Identifier / VIN / Class</th>
              <th>Territory / Location</th>
              <th>Stated Value / Exposure</th>
              <th>Safety Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>001</strong></td>
              <td>Primary Scheduled Unit / Facility A</td>
              <td class="font-mono">1FTNE31L8HDA89210</td>
              <td>Texas Core Operations Hub</td>
              <td class="font-mono font-bold">${sub.exposure}</td>
              <td><span class="badge badge-success">Verified Clear</span></td>
            </tr>
            <tr>
              <td><strong>002</strong></td>
              <td>Secondary Operational Support Asset</td>
              <td class="font-mono">1FTNE31L9HDA89211</td>
              <td>Regional Service Facility</td>
              <td class="font-mono font-bold">Included in Fleet Pool</td>
              <td><span class="badge badge-success">Verified Clear</span></td>
            </tr>
            <tr>
              <td><strong>003</strong></td>
              <td>Auxiliary Equipment & Contents</td>
              <td class="font-mono">EQUIP-SCHED-044</td>
              <td>Scheduled Terminals</td>
              <td class="font-mono font-bold">Full Replacement Cost</td>
              <td><span class="badge badge-info">Inspected</span></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4"><strong>TOTAL SCHEDULED EXPOSURE VALUATION:</strong></td>
              <td class="font-mono" style="color: var(--primary); font-size: 14px;"><strong>${sub.exposure}</strong></td>
              <td><span class="badge badge-primary">Within Appetite</span></td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  } else {
    // Loss Run Preview
    viewer.innerHTML = `
      <div class="doc-preview-sheet">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px;">
          <div>
            <h4 style="margin: 0; font-size: 16px; color: #0f172a;"><i class="ph ph-file-pdf text-danger"></i> OFFICIAL CARRIER SIGNED LOSS RUN REPORT</h4>
            <span class="text-secondary text-sm">Insured: ${sub.insured} • Prior 3-Year Valuation as of 2026-08-01</span>
          </div>
          <span class="badge badge-primary">Carrier Signed Official</span>
        </div>

        <table class="excel-sheet-table">
          <thead>
            <tr>
              <th>Policy Year</th>
              <th>Claim Number</th>
              <th>Loss Description</th>
              <th>Status</th>
              <th>Paid Losses</th>
              <th>Total Incurred</th>
            </tr>
          </thead>
          <tbody>
            ${sub.losses.map((l, i) => `
              <tr>
                <td><strong>${l.year}</strong></td>
                <td class="font-mono">CLM-2026-${1000 + i * 42}</td>
                <td>${l.desc}</td>
                <td><span class="badge ${l.status === 'Clean' ? 'badge-success' : 'badge-info'}">${l.status}</span></td>
                <td class="font-mono">${l.incurred}</td>
                <td class="font-mono font-bold">${l.incurred}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="lbl" style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">3-Year Cumulative Loss Ratio:</span>
            <strong style="color: #15803d; font-size: 15px; margin-left: 8px;">18.4% (Highly Favorable)</strong>
          </div>
          <div class="text-sm font-mono text-muted">
            <i class="ph ph-stamp text-primary"></i> Certified Carrier Loss Audit
          </div>
        </div>
      </div>
    `;
  }
}

function closeCaseDocsModal() {
  const modal = document.getElementById("caseDocsModal");
  if (modal) modal.classList.remove("active");
}

function proceedToCaseFromDocsModal() {
  closeCaseDocsModal();
  const targetId = currentHubSubId || activeSubmissionId;
  const sub = SUBMISSIONS_DATASET.find(s => s.id === targetId);
  if (sub) {
    openCaseAtCurrentStep(sub.id);
  }
}

// Modal: New Submission Creation
function openNewIntakeModal() {
  const modal = document.getElementById("newIntakeModal");
  if (modal) modal.classList.add("active");
}

function closeNewIntakeModal() {
  const modal = document.getElementById("newIntakeModal");
  if (modal) modal.classList.remove("active");
}

function toggleModalBrokerField() {
  const channelEl = document.getElementById("newIntakeChannel");
  const brokerGroup = document.getElementById("modalBrokerFieldGroup");
  if (channelEl && brokerGroup) {
    brokerGroup.style.display = channelEl.value === "broker" ? "block" : "none";
  }
}

function handleCreateNewIntake(e) {
  e.preventDefault();
  const channel = document.getElementById("newIntakeChannel")?.value || "broker";
  const lobKey = document.getElementById("newIntakeLOB")?.value || "trucking";
  const insured = document.getElementById("newIntakeInsured")?.value || "New Entity LLC";
  const fein = document.getElementById("newIntakeFEIN")?.value || "12-3456789";
  const broker = channel === "broker" ? (document.getElementById("newIntakeBroker")?.value || "Marsh & McLennan") : "Direct Customer Portal";

  const newId = `SUB-${Math.floor(10000 + Math.random() * 90000)}-${fein.slice(0,2)}`;
  
  const template = SUBMISSIONS_DATASET.find(s => s.lobKey === lobKey) || SUBMISSIONS_DATASET[0];
  const newSub = JSON.parse(JSON.stringify(template));
  newSub.id = newId;
  newSub.insured = insured;
  newSub.fein = fein;
  newSub.channelType = channel;
  newSub.broker = broker;
  newSub.priority = "P1";
  newSub.priorityScore = 95;
  newSub.slaText = "4h Fast-Track SLA";
  newSub.slaCountdown = "4h 00m remaining";
  newSub.priorityReason = "New Incoming Intake • Fast-Track FIFO Position #1";
  newSub.channelName = channel === "broker" ? `Broker Intake: ${broker}` : "Direct Customer Portal (Self-Service)";
  newSub.receivedAt = "Just Now";
  newSub.receivedTimestamp = Date.now();
  newSub.statusText = "Intake Ingested";
  newSub.statusBadge = "badge-primary";
  newSub.currentStep = 1;
  newSub.completedSteps = [];

  SUBMISSIONS_DATASET.unshift(newSub);
  closeNewIntakeModal();
  selectSubmission(newId, false);
  renderSubmissionsTable();
  showToast(`✅ New Submission [${newId}] created & added to Intake Queue!`, "success");
}

// ============================================================================
// 6. RENDERING ALL DOWNSTREAM SCREENS (SCREENS 2 TO 9)
// ============================================================================
function renderAllDownstreamScreens(sub) {
  // Screen 2: OCR Fields & Canonical Record
  renderOCRFields(sub.ocrFields, sub.docs);
  const canonInsured = document.getElementById("canonInsured");
  const canonLOB = document.getElementById("canonLOB");
  const canonExposure = document.getElementById("canonExposure");
  const canonJson = document.getElementById("canonicalJsonDisplay");
  const subIdBadge = document.getElementById("submissionIdBadge");

  if (canonInsured) canonInsured.textContent = sub.insured;
  if (canonLOB) canonLOB.textContent = sub.lobName;
  if (canonExposure) canonExposure.textContent = sub.exposure;
  if (canonJson) canonJson.textContent = JSON.stringify(sub.canonicalJson, null, 2);
  if (subIdBadge) subIdBadge.textContent = sub.id;

  // Screen 3: Clearance & Appetite
  const feinNum = document.getElementById("checkFeinNumber");
  const brokerLock = document.getElementById("brokerLock");
  if (feinNum) feinNum.textContent = sub.fein;
  if (brokerLock) brokerLock.textContent = sub.broker;
  renderFeinClearanceStatus(sub);
  renderAppetiteRules(sub.appetiteRules);

  // Screen 4: Third-Party Data Enrichment & Manual Assignment (Optional)
  renderEnrichmentCards(sub.enrichmentCards);
  const deskSelect = document.getElementById("manualDeskSelect");
  const uwSelect = document.getElementById("manualUnderwriterSelect");
  const callout = document.getElementById("assignmentVisibilityCallout");
  const text = document.getElementById("assignmentVisibilityText");
  const badge = document.getElementById("assignmentBadge");
  const slaTarget = document.getElementById("assignedSlaTarget");
  const tBadge = document.getElementById("triagePriorityBadge");
  const tFifo = document.getElementById("triageFifoTime");
  const tProducer = document.getElementById("triageProducerTier");
  const tSlaCount = document.getElementById("triageSlaCountdown");

  if (deskSelect && sub.desk) deskSelect.value = sub.desk;
  if (uwSelect && sub.underwriter) uwSelect.value = sub.underwriter;

  const isUnassigned = !sub.underwriter || sub.underwriter.includes("Unassigned");
  if (callout) callout.className = isUnassigned ? "assignment-visibility-callout unassigned" : "assignment-visibility-callout assigned";
  if (text) {
    text.innerHTML = isUnassigned 
      ? `<strong>Unassigned</strong> • Visible to all team members in the open queue pool.` 
      : `Assigned to: <strong>${sub.underwriter}</strong> • Only visible in assigned workspace.`;
  }
  if (badge) {
    badge.className = isUnassigned ? "badge badge-light" : "badge badge-primary";
    badge.innerHTML = isUnassigned ? `<i class="ph ph-users"></i> Optional / Open Pool` : `<i class="ph ph-user-check"></i> Assigned: ${sub.underwriter.split(' ')[0]}`;
  }

  if (slaTarget) slaTarget.textContent = sub.slaText;
  if (tBadge) {
    tBadge.className = `badge ${sub.priority === 'P1' ? 'badge-danger' : (sub.priority === 'P2' ? 'badge-warning' : 'badge-info')}`;
    tBadge.textContent = `Priority: ${sub.priority} - ${sub.priority === 'P1' ? 'Highest' : (sub.priority === 'P2' ? 'High' : 'Standard FIFO')} (Score: ${sub.priorityScore}/100)`;
  }
  if (tFifo) tFifo.textContent = `${sub.receivedAt.split(' ')[1]} ${sub.receivedAt.split(' ')[2]} (Received Ingestion Queue)`;
  if (tProducer) tProducer.textContent = sub.channelType === 'broker' ? "Tier-1 Commercial Broker" : "Direct Customer Self-Service";
  if (tSlaCount) tSlaCount.textContent = sub.slaCountdown;

  // Screen 5: Underwriting Workbench
  switchDocTab("acord");
  renderLossTable(sub.losses);
  renderSubjectivities(sub.subjectivities);
  renderUnderwritingWorkbench(sub);

  // Screen 6: Authority Matrix
  renderAuthorityScreen(sub);

  // Screen 7: Rating Engine Live JSON Payload Viewer & CSV Exporter
  renderRatingEnginePayload(sub);

  // Screen 8: Step 7 Case Summary / Generated Quote Studio
  renderStep7View(sub);

  // RFI Modal defaults
  const rfiEmail = document.getElementById("rfiRecipientEmail");
  const rfiSubj = document.getElementById("rfiSubject");
  if (rfiEmail) rfiEmail.value = sub.email;
  if (rfiSubj) rfiSubj.value = `URGENT: RFI on Submission #${sub.id} - ${sub.insured}`;
}

// Handler: Manual Underwriter Assignment Change (Screen 4)
function onManualAssignmentChange() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (!sub) return;

  const deskSelect = document.getElementById("manualDeskSelect");
  const uwSelect = document.getElementById("manualUnderwriterSelect");
  const callout = document.getElementById("assignmentVisibilityCallout");
  const text = document.getElementById("assignmentVisibilityText");
  const badge = document.getElementById("assignmentBadge");

  const selectedDesk = deskSelect ? deskSelect.value : sub.desk;
  const selectedUW = uwSelect ? uwSelect.value : sub.underwriter;

  sub.desk = selectedDesk;
  sub.underwriter = selectedUW;

  const isUnassigned = selectedUW.includes("Unassigned");

  if (isUnassigned) {
    if (callout) callout.className = "assignment-visibility-callout unassigned";
    if (text) text.innerHTML = `<strong>Unassigned</strong> • Visible to all team members in the open queue pool.`;
    if (badge) {
      badge.className = "badge badge-light";
      badge.innerHTML = `<i class="ph ph-users"></i> Optional / Open Pool`;
    }
    showToast(`Case unassigned: Visible to all team members in the open queue.`, "info");
  } else {
    if (callout) callout.className = "assignment-visibility-callout assigned";
    if (text) text.innerHTML = `Assigned to: <strong>${selectedUW}</strong> • Only visible in assigned workspace.`;
    if (badge) {
      badge.className = "badge badge-primary";
      badge.innerHTML = `<i class="ph ph-user-check"></i> Assigned: ${uwFirstName}`;
    }
    showToast(`✅ Case manually assigned to ${selectedUW}! Visible in ${uwFirstName}'s workspace.`, "success");
  }

  // Refresh Table highlights, and Team Activity (which groups by
  // underwriter — a reassignment changes which team member's card this
  // submission appears under).
  renderSubmissionsTable();
  refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
}

/**
 * Best-guess source document for an extracted field that has no explicit
 * `source` set on it — matches the field's key against the submission's
 * actual attached document names, falling back to the primary application
 * form (ACORD), same as a real OCR pipeline would tag its evidence doc.
 */
function guessFieldSource(fieldKey, docs) {
  if (!docs || docs.length === 0) return null;
  const key = fieldKey.toLowerCase();
  const find = needles => docs.find(d => needles.some(n => d.name.toLowerCase().includes(n)));
  let match = null;
  if (/loss|claim|incurred/.test(key)) match = find(["loss"]);
  else if (/driver|mvr|licen[sc]e/.test(key)) match = find(["mvr", "driver"]);
  else if (/safety|fmcsa|inspection|sprinkler|esfr|compliance/.test(key)) match = find(["fmcsa", "safety", "inspection", "sprinkler"]);
  else if (/unit|vehicle|sov|value|asset|building|contents|square|refrigeration|stated|tiv/.test(key)) match = find(["sov", "schedule"]);
  if (!match) match = find(["acord", "application"]) || docs[0];
  return match ? match.name : null;
}

// Helper: OCR Fields (Screen 2) — each row also shows exactly which
// attached document the value was extracted/transcribed from.
function renderOCRFields(fields, docs) {
  const container = document.getElementById("extractedFieldsList");
  if (!container || !fields) return;
  container.innerHTML = fields.map(f => {
    const sourceDoc = f.source || guessFieldSource(f.key, docs);
    const isManual = !/%/.test(f.conf || "");
    const sourceShort = sourceDoc && sourceDoc.length > 30 ? sourceDoc.substring(0, 28) + "…" : sourceDoc;
    return `
    <div class="extract-row">
      <span class="extract-key"><i class="ph ph-check text-success"></i> ${f.key}:</span>
      <span class="extract-val">${f.val}</span>
      <span class="extract-conf ${isManual ? 'manual' : ''}">${f.conf}${isManual ? '' : ' confidence'}</span>
      ${sourceDoc ? `<span class="extract-source" title="Extracted from: ${sourceDoc}"><i class="ph ${isManual ? 'ph-pencil-simple' : 'ph-file-text'}"></i> ${sourceShort}</span>` : ''}
    </div>`;
  }).join("");
}

// Helper: Appetite Rules (Screen 3)
/** Formats a rule's carrier base value for display/editing (e.g. 100 → "100 Vehicles", 25000000 → "$25,000,000"). */
function formatRuleBaseValue(r) {
  const bv = r.baseValue;
  if (bv === undefined || bv === null) return r.val;
  if (r.unit === "$") return "$" + Number(bv).toLocaleString();
  if (r.unit === "%") return bv + "%";
  if (typeof bv === "number") return bv + (r.unit ? " " + r.unit : "");
  return String(bv);
}

// Rules currently rendered in the appetite table, keyed by Rule ID — used
// by validateMgaOverrideInput() to look up each input's guardrail on edit.
let currentAppetiteRulesById = {};

// Helper: Appetite Rules (Screen 3) — for each rule, if the current persona
// has "override" permission on the appetiteRules resource (set in User
// Master) AND the rule itself is MGA-overridable, render an editable
// carrier base-value control that flags red the moment it's set outside
// the carrier guardrail; otherwise render the base value as plain text.
function toggleAppetiteRuleOverride(ruleId) {
  const canOverridePermission = hasPermission("appetiteRules", "override");
  if (!canOverridePermission) {
    denyPermission("appetiteRules", "override");
    return;
  }

  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (!sub || !sub.appetiteRules) return;

  const rule = sub.appetiteRules.find(r => r.ruleId === ruleId);
  if (!rule) return;

  rule.overridden = !rule.overridden;
  if (rule.overridden) {
    rule.pass = true;
    showToast(`🛡️ Underwriter override applied to rule ${ruleId} (${rule.factor}).`, "warning");
  } else {
    showToast(`Underwriter override removed for rule ${ruleId}.`, "info");
  }

  renderAppetiteRules(sub.appetiteRules);
}

function renderAppetiteRules(rules) {
  const table = document.getElementById("appetiteRulesTable");
  if (!table || !rules) return;

  currentAppetiteRulesById = {};
  const canOverridePermission = hasPermission("appetiteRules", "override");

  table.innerHTML = rules.map(r => {
    const ruleId = r.ruleId || "";
    if (ruleId) currentAppetiteRulesById[ruleId] = r;
    const factor = r.factor || r.desc;
    const guardrailText = r.guardrail || r.threshold;
    const showOverrideControl = canOverridePermission;
    const isYesNo = (r.unit || "").toLowerCase() === "yes/no";
    const baseValDisplay = formatRuleBaseValue(r);

    let overrideCell;
    if (showOverrideControl && isYesNo) {
      overrideCell = `
        <select class="mga-override-input" data-rule-id="${ruleId}" onchange="validateMgaOverrideInput(this)">
          <option value="Yes" ${r.baseValue === "Yes" ? "selected" : ""}>Yes</option>
          <option value="No" ${r.baseValue === "No" ? "selected" : ""}>No</option>
        </select>`;
    } else if (showOverrideControl) {
      overrideCell = `<input type="text" class="mga-override-input" data-rule-id="${ruleId}" value="${baseValDisplay}" oninput="validateMgaOverrideInput(this)">`;
    } else {
      overrideCell = `<span class="mga-override-readonly">${baseValDisplay}</span>`;
    }

    let statusBadge;
    if (r.overridden) {
      statusBadge = `
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="badge badge-warning">
            <i class="ph ph-shield-check"></i> OVERRIDDEN
          </span>
          ${canOverridePermission ? `
            <button class="btn btn-xs btn-outline-secondary p-0 px-1" onclick="toggleAppetiteRuleOverride('${ruleId}')" title="Remove Override" style="font-size:10px;">
              <i class="ph ph-x"></i>
            </button>` : ''}
        </div>`;
    } else if (!r.pass && canOverridePermission) {
      statusBadge = `
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="badge badge-danger">
            <i class="ph ph-x"></i> FAIL
          </span>
          <button class="btn btn-xs btn-outline-warning" onclick="toggleAppetiteRuleOverride('${ruleId}')" style="font-size:10px; padding:2px 6px;">
            <i class="ph ph-shield-check"></i> Override
          </button>
        </div>`;
    } else {
      statusBadge = `
        <span class="badge ${r.pass ? 'badge-success' : 'badge-danger'}">
          <i class="ph ${r.pass ? 'ph-check' : 'ph-x'}"></i> ${r.pass ? 'PASS' : 'FAIL'}
        </span>`;
    }

    return `
    <tr>
      <td>
        ${ruleId ? `<span class="badge badge-light font-mono" style="font-size:9.5px;">${ruleId}</span><br>` : ''}
        <strong>${factor}</strong>
        ${r.category ? `<div class="text-xs text-muted">${r.category}</div>` : ''}
      </td>
      <td class="font-mono">${r.val}</td>
      <td>
        <div class="mga-override-cell">
          ${overrideCell}
          <span class="mga-guardrail-note">Guardrail: ${guardrailText}</span>
          <span class="mga-exceed-msg" style="display:none;"></span>
        </div>
      </td>
      <td>
        ${statusBadge}
      </td>
    </tr>`;
  }).join("");

  // Initial validation pass so a base value that already exceeds its
  // guardrail is flagged red immediately on render, not just on edit.
  table.querySelectorAll(".mga-override-input").forEach(el => validateMgaOverrideInput(el));

  // Update appetite status badge on Screen 3 header
  const statusBadgeHeader = document.getElementById("appetiteStatusBadge");
  if (statusBadgeHeader) {
    const hasFailures = rules.some(r => !r.pass && !r.overridden);
    const hasOverrides = rules.some(r => r.overridden);
    if (hasFailures) {
      statusBadgeHeader.className = "badge badge-danger";
      statusBadgeHeader.innerHTML = `<i class="ph ph-warning"></i> Appetite Knockout Triggered`;
    } else if (hasOverrides) {
      statusBadgeHeader.className = "badge badge-warning";
      statusBadgeHeader.innerHTML = `<i class="ph ph-shield-check"></i> Overridden by Underwriter`;
    } else {
      statusBadgeHeader.className = "badge badge-success";
      statusBadgeHeader.innerHTML = `<i class="ph ph-check"></i> All Appetite Rules Met`;
    }
  }
}

/**
 * Validates an MGA-editable appetite rule override value against its
 * carrier guardrail (parsed from the rule's guardrail string, e.g. "<= 150"
 * or ">= 2") and toggles red styling + an inline "Exceeds guardrail"
 * message when the entered value violates it. Guardrails that aren't a
 * simple numeric comparison (e.g. jurisdiction allowlists) are
 * informational only and are never flagged red.
 */
function validateMgaOverrideInput(inputEl) {
  const canOverridePermission = hasPermission("appetiteRules", "override");
  if (!canOverridePermission) {
    denyPermission("appetiteRules", "override");
    return;
  }

  const ruleId = inputEl.dataset.ruleId;
  const rule = currentAppetiteRulesById[ruleId];
  const cell = inputEl.closest(".mga-override-cell");
  const msgEl = cell ? cell.querySelector(".mga-exceed-msg") : null;
  if (!rule) return;

  rule.baseValue = inputEl.value;
  rule.overridden = true;

  const guardrailMatch = (rule.guardrail || "").match(/(<=|>=|<|>)\s*\$?([\d,]+(?:\.\d+)?)/);
  let violated = false;

  if (guardrailMatch) {
    const op = guardrailMatch[1];
    const limit = parseFloat(guardrailMatch[2].replace(/,/g, ""));
    const entered = parseFloat(String(inputEl.value).replace(/[^0-9.\-]/g, ""));
    if (!isNaN(entered)) {
      if ((op === "<=" || op === "<") && entered > limit) violated = true;
      if ((op === ">=" || op === ">") && entered < limit) violated = true;
    }
  }

  inputEl.classList.toggle("mga-exceeded", violated);
  if (msgEl) {
    msgEl.style.display = violated ? "inline-flex" : "none";
    if (violated) msgEl.innerHTML = `<i class="ph ph-warning-circle"></i> Exceeds guardrail`;
  }
}

/**
 * Validates underwriter base rate override for a vehicle in the 3-unit Vehicles schedule.
 * Permission-gated using the exact same override permission check as Appetite Rules.
 */
function validateVehicleBaseRateOverride(inputEl, subId) {
  const canOverride = hasPermission("appetiteRules", "override");
  if (!canOverride) {
    denyPermission("appetiteRules", "override");
    return;
  }

  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId) || SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (!sub || !sub.vehicles) return;

  const vehicleId = Number(inputEl.dataset.vehicleId);
  const vehicle = sub.vehicles.find(v => (v.id === vehicleId || v.xid === vehicleId));
  const cell = inputEl.closest(".mga-override-cell");
  const msgEl = cell ? cell.querySelector(".mga-exceed-msg") : null;
  if (!vehicle) return;

  const enteredRate = parseFloat(inputEl.value);
  let violated = false;
  if (!isNaN(enteredRate)) {
    if (enteredRate < 500 || enteredRate > 1200) {
      violated = true;
    }
    vehicle.liab_baserate = enteredRate;
    vehicle.overridden = true;

    // Recalculate item premium for this vehicle
    const ilf = Number(vehicle.liab_ilf_factor || 2.06);
    const lcm = Number(vehicle.liab_lcm_factor || 1.67);
    const fleet = Number(vehicle.liab_fleet_factor || 0.97);
    const age = Number(vehicle.vehicle_age_factor || 1.12);
    const radius = Number(vehicle.radius_factor || 0.95);
    const naics = Number(vehicle.naics_factor || 1.1);

    const calculatedPrem = Math.round(enteredRate * ilf * lcm * fleet * age * radius * naics * 100) / 100;
    const formattedPrem = "$" + calculatedPrem.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    vehicle.liability_premium = formattedPrem;
    vehicle.al_premium_wo_mod_factor = formattedPrem;

    // Update item premium cell in table row
    const row = inputEl.closest("tr");
    if (row) {
      const premEl = row.querySelector(".vehicle-item-premium");
      if (premEl) {
        premEl.innerHTML = `<strong style="color: #15803d; font-size: 13px;">${formattedPrem}</strong> <span class="badge badge-warning text-xs ml-1"><i class="ph ph-shield-check"></i> UW Override</span>`;
      }
    }
  }

  inputEl.classList.toggle("mga-exceeded", violated);
  if (msgEl) {
    msgEl.style.display = violated ? "inline-flex" : "none";
    if (violated) msgEl.innerHTML = `<i class="ph ph-warning-circle"></i> Exceeds guardrail ($500 - $1,200)`;
  }
}

// Helper: Enrichment Cards (Screen 4)
function renderEnrichmentCards(cards) {
  const grid = document.getElementById("enrichmentCardsGrid");
  if (!grid || !cards) return;
  grid.innerHTML = cards.map(c => `
    <div class="enrich-card">
      <div class="enrich-card-header">
        <span class="title"><i class="ph ${c.icon} text-primary"></i> ${c.title}</span>
        <span class="badge ${c.tag || 'badge-success'}"><i class="ph ph-check-circle"></i> Verified</span>
      </div>
      <div class="enrich-stat-num">${c.val}</div>
      <div class="enrich-stat-lbl">${c.label}</div>
    </div>
  `).join("");
}

// Helper: Document Tab in Screen 5
function switchDocTab(tabKey) {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (!sub) return;

  const tAcord = document.getElementById("tabDocAcord");
  const tSov = document.getElementById("tabDocSov");
  const tLoss = document.getElementById("tabDocLoss");

  if (tAcord) tAcord.classList.remove("active");
  if (tSov) tSov.classList.remove("active");
  if (tLoss) tLoss.classList.remove("active");

  const panel = document.getElementById("docPreviewPanel");
  if (!panel) return;

  if (tabKey === "acord") {
    if (tAcord) tAcord.classList.add("active");
    panel.innerHTML = `
      <div class="acord-form-mock">
        <div class="acord-top-bar">
          <span class="acord-title">ACORD APPLICATION FORM • ${sub.docs[0]?.name || 'Application.pdf'}</span>
          <span class="badge badge-primary">Standard ISO Form</span>
        </div>
        <div class="form-grid">
          <div><strong>Named Insured:</strong> ${sub.insured}</div>
          <div><strong>FEIN:</strong> ${sub.fein}</div>
          <div><strong>Mailing Address:</strong> ${sub.address}</div>
          <div><strong>Broker / Origin:</strong> ${sub.broker}</div>
          <div><strong>Line of Business:</strong> ${sub.lobName}</div>
          <div><strong>Total Exposure:</strong> ${sub.exposure}</div>
        </div>
      </div>
    `;
  } else if (tabKey === "sov") {
    if (tSov) tSov.classList.add("active");
    panel.innerHTML = `
      <div class="acord-form-mock">
        <div class="acord-top-bar">
          <span class="acord-title">STATEMENT OF VALUES (SOV) • ${sub.docs[1]?.name || 'SOV_Schedule.xlsx'}</span>
          <span class="badge badge-success">Schedule Normalized</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Schedule Item #</th>
              <th>Asset Description</th>
              <th>Territory / Location</th>
              <th>Stated Value / Exposure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>Primary Asset Group A</td>
              <td>Texas Operations Hub</td>
              <td>${sub.exposure}</td>
            </tr>
            <tr>
              <td>002</td>
              <td>Secondary Scheduled Assets</td>
              <td>Regional Garaging / Office</td>
              <td>Verified & Cleared</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } else if (tabKey === "loss") {
    if (tLoss) tLoss.classList.add("active");
    panel.innerHTML = `
      <div class="acord-form-mock">
        <div class="acord-top-bar">
          <span class="acord-title">CARRIER SIGNED LOSS RUN REPORT • 3-Year History</span>
          <span class="badge badge-success">Official Audit Verified</span>
        </div>
        <p class="text-secondary text-sm">Official valuation date: 2026-08-01. Verified with prior underwriting carriers.</p>
      </div>
    `;
  }
}

// Helper: Loss Runs Table in Screen 5
function renderLossTable(losses) {
  const table = document.getElementById("wbLossTable");
  if (!table || !losses) return;
  table.innerHTML = losses.map(l => `
    <tr>
      <td><strong>${l.year}</strong></td>
      <td>${l.desc}</td>
      <td><span class="badge ${l.status === 'Clean' ? 'badge-success' : 'badge-info'}">${l.status}</span></td>
      <td class="font-mono font-bold">${l.incurred}</td>
    </tr>
  `).join("");
}

// Helper: Subjectivities in Screen 5
function renderSubjectivities(subjs) {
  const list = document.getElementById("subjectivityList");
  if (!list || !subjs) return;
  list.innerHTML = subjs.map((s, idx) => `
    <div class="subj-item">
      <input type="checkbox" id="subj_${idx}" checked>
      <label class="subj-text" for="subj_${idx}">${s}</label>
      <span class="badge badge-warning">Pre-Bind Condition</span>
    </div>
  `).join("");
}

/**
 * Dynamic Underwriting Workbench Data Renderer (Screen 5)
 * Displays account info, coverages, limits, operational factors, vehicles schedule, and driver schedule.
 */
function renderUnderwritingWorkbench(sub) {
  if (!sub) return;

  const overviewContainer = document.getElementById("wbAccountOverviewContainer");
  const docsContainer = document.getElementById("wbAttachedDocsContainer");
  const coveragesContainer = document.getElementById("wbCoveragesGridContainer");
  const vehiclesContainer = document.getElementById("wbVehiclesScheduleContainer");
  const driversContainer = document.getElementById("wbDriversScheduleContainer");

  const gen = sub.genInfo || { quotetype: sub.lobName, policytype: "New Business", billtype: "Agency Bill", effective_date: "09/01/2026", expiration_date: "09/01/2027", lock_rate_effective_date: "08/25/2026", binding: "pending" };
  // FEIN always comes from sub.fein (the single authoritative source that
  // gets updated by Decline Center "Fix" actions etc.) — never from a
  // potentially stale copy baked into insuredInfo, to prevent the header
  // and this panel from ever showing two different FEIN values.
  const ins = { entity_type: "Corporation / LLC", insured_name: sub.insured, fein: sub.fein, dot_number: sub.dot, address: sub.address, description_of_operation: sub.priorityReason, ...(sub.insuredInfo || {}), fein: sub.fein };
  const cov = sub.coveragesInfo || { rating_type: "Composite Rating Engine", liability: sub.exposureVal || 1850000, cargo_limit: 250000, pd_deductible_amount: 2500, pd_high_deductible: 5000, naics_code: 484110, rating_class: 5, towing: "10000" };
  const fil = sub.filingInfo || { safer_factor: "1.0", FMCSA_alert: "0", uw_credit_debit_factor: "0.95" };
  const rad = sub.radiusOfOperationsInfo || { radius: 450, Intrastate_interstate: "Interstate" };
  const uwRev = sub.uwReviewInfo || { driver_factor: 1, og_driver_count: 12, cr_driver_count: 5, al_pollution: "Low", min_earn_factor: 25, broker_fee_amount: 2574 };
  const bFee = sub.broker_fee?.amount || uwRev.broker_fee_amount || 2574;

  const vehicles = sub.vehicles || [
    { id: 903100, xid: 1, year: 2024, make: "Apex Freightliner", model: "Cascadia Heavy Sleeper", model_number: "MOD-2024-CAS884", assigned_driver: "Apex Freight LLC (CDL Class A)", radius_miles: 450, weight: "Commercial", ownership: "Owned", primary_code: 332, rating_class: 5, stated_value: 1850000, al_value: 370000, miles_driven: 450, liab_baserate: 837, liab_ilf_factor: 2.06, liab_lcm_factor: 1.67, liab_fleet_factor: 0.97, vehicle_age_factor: 1.12, radius_factor: 0.95, naics_factor: 1.1, al_premium_wo_mod_factor: "$36,200.00" },
    { id: 903101, xid: 2, year: 2024, make: "Apex Kenworth", model: "T680 Next Gen", model_number: "MOD-2024-KW712", assigned_driver: "Marcus Vance (Senior Fleet UW Driver)", radius_miles: 450, weight: "Commercial", ownership: "Owned", primary_code: 332, rating_class: 5, stated_value: 1850000, al_value: 370000, miles_driven: 450, liab_baserate: 837, liab_ilf_factor: 2.06, liab_lcm_factor: 1.67, liab_fleet_factor: 0.97, vehicle_age_factor: 1.12, radius_factor: 0.95, naics_factor: 1.1, al_premium_wo_mod_factor: "$10,252.00" },
    { id: 903102, xid: 3, year: 2024, make: "Apex Peterbilt", model: "579 UltraLoft", model_number: "MOD-2024-PB579", assigned_driver: "Sarah Jenkins (Lead Fleet UW Driver)", radius_miles: 450, weight: "Commercial", ownership: "Owned", primary_code: 332, rating_class: 5, stated_value: 1850000, al_value: 370000, miles_driven: 450, liab_baserate: 837, liab_ilf_factor: 2.06, liab_lcm_factor: 1.67, liab_fleet_factor: 0.97, vehicle_age_factor: 1.12, radius_factor: 0.95, naics_factor: 1.1, al_premium_wo_mod_factor: "$2,148.00" }
  ];

  const drivers = sub.drivers || [
    { id: 942561, given_name: "Apex", last_name: "Freight LLC", dob: "01/01/1990", licensestate: "Houston", licenseclasstype: "Class A", experience: "5 Years", tenure: 3, status: "Active Verified", driver_factor: 1 }
  ];

  // 1. Account Overview Panel
  if (overviewContainer) {
    overviewContainer.innerHTML = `
      <div class="card p-3" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">
            <i class="ph ph-receipt text-primary"></i> General Information & Insured Account Profile
          </h3>
          <div style="display: flex; gap: 6px; align-items: center;">
            <span class="badge badge-primary font-mono">${sub.quote_id || sub.quoteNo || 'QT-TRK-2026-89412'}</span>
            <span class="badge badge-success">${gen.policytype || 'New Business'}</span>
            <span class="badge badge-warning">${gen.binding ? gen.binding.toUpperCase() : 'PENDING'}</span>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 12px;">
          <div><span style="color: #64748b; font-weight: 600;">Named Insured:</span> <strong style="display: block; color: #0f172a; font-size: 13.5px;">${ins.insured_name || sub.insured}</strong></div>
          <div><span style="color: #64748b; font-weight: 600;">FEIN / Tax ID:</span> <strong style="display: block; color: #0f172a;" class="font-mono">${ins.fein || sub.fein}</strong></div>
          <div><span style="color: #64748b; font-weight: 600;">USDOT Number:</span> <strong style="display: block; color: #0f172a;" class="font-mono">${ins.dot_number || sub.dot}</strong></div>
          <div><span style="color: #64748b; font-weight: 600;">Entity Type:</span> <strong style="display: block; color: #0f172a;">${ins.entity_type || 'Corporation / LLC'}</strong></div>

          <div><span style="color: #64748b; font-weight: 600;">Policy Effective Dates:</span> <strong style="display: block; color: #0f172a;">${gen.effective_date || '09/01/2026'} – ${gen.expiration_date || '09/01/2027'}</strong></div>
          <div><span style="color: #64748b; font-weight: 600;">Lock Rate Date:</span> <strong style="display: block; color: #0f172a;">${gen.lock_rate_effective_date || '08/25/2026'}</strong></div>
          <div><span style="color: #64748b; font-weight: 600;">Billing Plan:</span> <strong style="display: block; color: #0f172a;">${gen.billtype || 'Agency Bill'}</strong></div>
          <div><span style="color: #64748b; font-weight: 600;">Broker Fee Amount:</span> <strong style="display: block; color: #16a34a;" class="font-mono">$${Number(bFee).toLocaleString()}</strong></div>
        </div>
        <div style="background: #f8fafc; padding: 8px 12px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 11.5px; margin-top: 10px;">
          <span style="color: #64748b; font-weight: 700;">Description of Operations & Underwriting Appetite:</span>
          <span style="color: #1e293b; font-weight: 600; margin-left: 6px;">${ins.description_of_operation || sub.priorityReason}</span>
        </div>
      </div>
    `;
  }
  // 1.5. Attached Underwriting Documents Panel
  if (docsContainer) {
    const docsList = sub.docs || [
      { name: "ACORD_137_Commercial_Auto_Application.pdf", type: "pdf", desc: "Application Form • 4 Pages • 1.4 MB" },
      { name: "Apex_Freight_Vehicle_SOV_Schedule.xlsx", type: "xls", desc: "Statement of Values (SOV) • 12 Units • 420 KB" },
      { name: "Prior_3_Years_Loss_Runs_Official.pdf", type: "pdf", desc: "Loss Run History • 2 Claims Logged • 2.1 MB" },
      { name: "Driver_MVR_Verification_Report_2026.pdf", type: "pdf", desc: "Official MVR Audit • 100% Active Verified • 850 KB" },
      { name: "FMCSA_Safety_Inspection_Certificate.pdf", type: "pdf", desc: "FMCSA Compliance Audit • Grade A • 1.2 MB" }
    ];

    docsContainer.innerHTML = `
      <div class="card p-3" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 14.5px; font-weight: 800; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">
            <i class="ph ph-folder-open text-primary"></i> Attached Underwriting Documents (${docsList.length} Uploaded Files)
          </h3>
          <button class="btn btn-xs btn-primary" onclick="openDocsManagerModal('${sub.id}')" style="font-weight: 700;">
            <i class="ph ph-tree-structure"></i> View All Documents (${docsList.length})
          </button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;">
          ${docsList.map((d, docIdx) => `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
                <div style="font-size: 22px;">
                  <i class="ph ${d.type === 'pdf' ? 'ph-file-pdf text-danger' : 'ph-file-xls text-success'}"></i>
                </div>
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  <strong style="font-size: 12px; color: #0f172a; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${d.name}</strong>
                  <span style="font-size: 11px; color: #64748b;">${d.desc || 'Uploaded Underwriting Document'}</span>
                </div>
              </div>
              <button class="btn btn-xs btn-outline-primary" onclick="previewDocForSubmission('${sub.id}', ${docIdx})" style="white-space: nowrap; font-weight: 700; font-size: 11px; padding: 4px 8px;">
                <i class="ph ph-eye"></i> View Doc
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  // 1.8. Intake Questionnaire & Risk Assessment Responses Panel
  const questContainer = document.getElementById("wbQuestionnaireContainer");
  if (questContainer) {
    questContainer.innerHTML = `
      <div class="card p-3" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 14.5px; font-weight: 800; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">
            <i class="ph ph-question text-primary"></i> Intake Questionnaire & Risk Assessment Responses (8 Configured Questions)
          </h3>
          <div style="display: flex; gap: 6px; align-items: center;">
            <span class="badge badge-success" style="font-weight: 700;"><i class="ph ph-checks"></i> 100% Completed Intake</span>
            <span class="badge badge-primary text-xs">PRD-016 Questionnaire Studio</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 12px;">
          <!-- Group 1: Vehicle Usage & Fleet Operations -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
            <h4 style="font-size: 12.5px; font-weight: 700; color: #1e293b; margin-bottom: 8px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
              <span><i class="ph ph-truck text-info"></i> Group 1: Vehicle Usage & Route Operations</span>
              <span class="badge badge-light text-xs font-mono">grp-1</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px;">
              <div><span style="color: #64748b; font-weight: 600;">Q1. Garaging & Operating Radius:</span> <strong style="display: block; color: #0f172a; margin-top: 2px;">Interstate Regional Hauling (${rad.radius || 450} Miles Radius)</strong></div>
              <div><span style="color: #64748b; font-weight: 600;">Q2. Cargo Type & Hazmat Exposure:</span> <strong style="display: block; color: #0f172a; margin-top: 2px;">Dry Van General Freight (Non-Hazardous, Low Risk)</strong></div>
              <div><span style="color: #64748b; font-weight: 600;">Q3. Facility Security & Overnight Parking:</span> <strong style="display: block; color: #0f172a; margin-top: 2px;">Fenced & Gated Facility with 24/7 CCTV Monitoring</strong></div>
            </div>
          </div>

          <!-- Group 2: Driver Pool & Safety Protocols -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
            <h4 style="font-size: 12.5px; font-weight: 700; color: #1e293b; margin-bottom: 8px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
              <span><i class="ph ph-identification-card text-success"></i> Group 2: Driver Pool & Safety Protocols</span>
              <span class="badge badge-light text-xs font-mono">grp-2</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px;">
              <div><span style="color: #64748b; font-weight: 600;">Q4. Min CDL Driving Experience:</span> <strong style="display: block; color: #0f172a; margin-top: 2px;">5+ Years CDL Class A Required (Verified)</strong></div>
              <div><span style="color: #64748b; font-weight: 600;">Q5. Pre-Employment Drug & Alcohol Testing:</span> <strong style="display: block; color: #16a34a; margin-top: 2px;"><i class="ph ph-check-circle"></i> 100% Compliant (DOT Testing Protocol)</strong></div>
              <div><span style="color: #64748b; font-weight: 600;">Q6. Telematics & Speed Monitoring:</span> <strong style="display: block; color: #0f172a; margin-top: 2px;">Enabled (Real-time Fleet Telematics Tracking)</strong></div>
            </div>
          </div>

          <!-- Group 3: Loss Prevention & Anti-Theft -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
            <h4 style="font-size: 12.5px; font-weight: 700; color: #1e293b; margin-bottom: 8px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
              <span><i class="ph ph-lock text-warning"></i> Group 3: Anti-Theft & Loss Prevention</span>
              <span class="badge badge-light text-xs font-mono">grp-3</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px;">
              <div><span style="color: #64748b; font-weight: 600;">Q7. Anti-Theft GPS Immobilizers:</span> <strong style="display: block; color: #16a34a; margin-top: 2px;"><i class="ph ph-check-circle"></i> Installed on 100% of Power Units</strong></div>
              <div><span style="color: #64748b; font-weight: 600;">Q8. Prior 3-Year Claims Logged:</span> <strong style="display: block; color: #0f172a; margin-top: 2px;">2 Closed Claims ($6,000 Total Incurred - Clean)</strong></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Coverages & Operational Factors Grid
  if (coveragesContainer) {
    coveragesContainer.innerHTML = `
      <div class="two-col-grid">
        <!-- Left: Coverages & Limits -->
        <div class="card p-3" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: var(--shadow-sm);">
          <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
            <span><i class="ph ph-shield-check text-primary"></i> Coverages, Limits & Deductibles</span>
            <span class="badge badge-light text-xs font-mono">${cov.rating_type || 'Composite Rating Engine'}</span>
          </h3>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; background: #eff6ff; padding: 6px 10px; border-radius: 4px; border: 1px solid #bfdbfe;">
              <span>Auto Liability Limit (CSL):</span>
              <strong class="font-mono text-primary">$${Number(cov.liability || 1850000).toLocaleString()} CSL</strong>
            </div>
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span>Physical Damage Deductible:</span>
              <strong class="font-mono">$${Number(cov.pd_deductible_amount || 2500).toLocaleString()} (High Ded: $${Number(cov.pd_high_deductible || 5000).toLocaleString()})</strong>
            </div>
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span>Motor Truck Cargo Limit:</span>
              <strong class="font-mono text-success">$${Number(cov.cargo_limit || 250000).toLocaleString()}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span>Towing & Storage Limit:</span>
              <strong class="font-mono">$${Number(cov.towing || 10000).toLocaleString()}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span>NAICS Code & Rating Class:</span>
              <strong class="font-mono">${cov.naics_code || 484110} (Rating Class ${cov.rating_class || 5})</strong>
            </div>
          </div>
        </div>

        <!-- Right: Operational Profile & Rating Factors -->
        <div class="card p-3" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: var(--shadow-sm);">
          <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
            <span><i class="ph ph-sliders text-warning"></i> Operational Profile & Rating Factors</span>
            <span class="badge badge-success text-xs">UW Factor: ${fil.uw_credit_debit_factor || '0.95'}</span>
          </h3>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span>Operating Radius & Scope:</span>
              <strong>${rad.radius || 450} Miles (${rad.Intrastate_interstate || 'Interstate'})</strong>
            </div>
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span>SAFER Safety Factor:</span>
              <strong class="font-mono text-success">Factor ${fil.safer_factor || '1.0'} (${fil.FMCSA_alert || 0} Alerts)</strong>
            </div>
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span>Driver Pool & Experience:</span>
              <strong>${uwRev.og_driver_count || 12} Total (${uwRev.cr_driver_count || 5} Active Verified)</strong>
            </div>
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span>Pollution Risk & Min Earned:</span>
              <strong>${uwRev.al_pollution || 'Low'} Exposure (Min Earned ${uwRev.min_earn_factor || 25}%)</strong>
            </div>
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <span>UW Discretionary Factor:</span>
              <strong class="text-primary font-mono">${fil.uw_credit_debit_factor ? (Number(fil.uw_credit_debit_factor) < 1 ? '-' + Math.round((1 - Number(fil.uw_credit_debit_factor)) * 100) + '% Discretionary Credit' : '+' + Math.round((Number(fil.uw_credit_debit_factor) - 1) * 100) + '% Debit') : '0%'}</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. Vehicles Schedule Table
  if (vehiclesContainer) {
    const canOverrideBaseRate = hasPermission("appetiteRules", "override");

    vehiclesContainer.innerHTML = `
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
        <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0;">
          <i class="ph ph-truck text-primary"></i> Vehicles Risk & Stated Value Schedule (${vehicles.length} Vehicle Units)
        </h3>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge ${canOverrideBaseRate ? 'badge-warning' : 'badge-success'}" style="font-size: 11px;">
            <i class="ph ${canOverrideBaseRate ? 'ph-shield-check' : 'ph-lock'}"></i>
            ${canOverrideBaseRate ? 'UW Base Rate Overrides Enabled' : 'Base Rate Rating Factors Locked'}
          </span>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="data-table wb-detail-table">
            <thead>
              <tr>
                <th>Unit #</th>
                <th>Year & Description</th>
                <th>Model No. & Driver</th>
                <th>Operating Radius</th>
                <th>Stated Value</th>
                <th>AL Value</th>
                <th>Class</th>
                <th>Actuarial Rating Factors</th>
                <th>Base Rate & Validation</th>
                <th>Item Premium</th>
              </tr>
            </thead>
            <tbody>
              ${vehicles.map(v => {
                const baseVal = v.liab_baserate || 837;
                let baseRateCell;
                if (canOverrideBaseRate) {
                  baseRateCell = `
                    <div class="mga-override-cell">
                      <input type="number" class="mga-override-input vehicle-baserate-input" data-vehicle-id="${v.id}" value="${baseVal}" step="1" oninput="validateVehicleBaseRateOverride(this, '${sub.id}')">
                      <span class="mga-guardrail-note">Guardrail: $500 – $1,200</span>
                      <span class="mga-exceed-msg" style="display:none;"></span>
                    </div>`;
                } else {
                  baseRateCell = `
                    <div class="mga-override-cell">
                      <span class="mga-override-readonly">$${baseVal}</span>
                      <span class="mga-guardrail-note">Guardrail: $500 – $1,200</span>
                    </div>`;
                }

                const driverName = v.assigned_driver || (drivers && drivers[0] ? drivers[0].given_name + ' ' + drivers[0].last_name : 'Apex Freight LLC (CDL Class A)');
                const modelNo = v.model_number || ('MOD-2024-TRK' + (v.xid || v.id));
                const radiusVal = v.miles_driven || v.radius_miles || rad.radius || 450;

                return `
                <tr>
                  <td><span class="badge badge-light font-mono">#${v.xid || v.id}</span></td>
                  <td>
                    <strong style="color: #0f172a;">${v.year} ${v.make} ${v.model}</strong>
                    <div class="text-xs text-muted">${v.weight || 'Commercial'} • ${v.ownership || 'Owned'}</div>
                  </td>
                  <td>
                    <div class="font-mono text-xs font-bold" style="color: #2563eb;"><i class="ph ph-hash"></i> ${modelNo}</div>
                    <div class="text-xs text-secondary mt-1" style="display: flex; align-items: center; gap: 4px;">
                      <i class="ph ph-user text-primary"></i> <strong>${driverName}</strong>
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-info" style="font-weight: 700; font-size: 11px;">
                      <i class="ph ph-navigation-arrow"></i> ${radiusVal} Miles Radius
                    </span>
                  </td>
                  <td class="font-mono font-bold">$${Number(v.stated_value || 1850000).toLocaleString()}</td>
                  <td class="font-mono text-primary">$${Number(v.al_value || 370000).toLocaleString()}</td>
                  <td><span class="badge badge-info">Class ${v.rating_class || 5}</span></td>
                  <td style="font-size: 11px;" class="font-mono">
                    ILF: ${v.liab_ilf_factor || '2.06'} | LCM: ${v.liab_lcm_factor || '1.67'}<br>
                    Fleet: ${v.liab_fleet_factor || '0.97'} | Age: ${v.vehicle_age_factor || '1.12'} | Radius: ${radiusVal} Miles (${v.radius_factor || '0.95'})
                  </td>
                  <td>${baseRateCell}</td>
                  <td class="font-mono vehicle-item-premium">
                    <strong style="color: #15803d; font-size: 13px;">${v.liability_premium || v.al_premium_wo_mod_factor || '$36,200.00'}</strong>
                    ${v.overridden ? `<span class="badge badge-warning text-xs ml-1"><i class="ph ph-shield-check"></i> UW Override</span>` : ''}
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    if (canOverrideBaseRate) {
      vehiclesContainer.querySelectorAll(".vehicle-baserate-input").forEach(el => validateVehicleBaseRateOverride(el, sub.id));
    }
  }

  // 4. Drivers Schedule Table
  if (driversContainer) {
    driversContainer.innerHTML = `
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
        <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0;">
          <i class="ph ph-identification-card text-success"></i> Drivers Schedule & Verification Status (${drivers.length} Driver)
        </h3>
        <span class="badge badge-primary">MVR Verified</span>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="data-table wb-detail-table">
            <thead>
              <tr>
                <th>Driver ID</th>
                <th>Full Name & DOB</th>
                <th>License State & Class</th>
                <th>CDL Experience</th>
                <th>Tenure</th>
                <th>Status</th>
                <th>Driver Factor</th>
              </tr>
            </thead>
            <tbody>
              ${drivers.map(d => `
                <tr>
                  <td><span class="badge badge-light font-mono">DRV-${d.id}</span></td>
                  <td>
                    <strong style="color: #0f172a;">${d.given_name} ${d.last_name}</strong>
                    <div class="text-xs text-muted">DOB: ${d.dob}</div>
                  </td>
                  <td>${d.licensestate} • <strong>${d.licenseclasstype}</strong></td>
                  <td>${d.experience}</td>
                  <td>${d.tenure} Years</td>
                  <td><span class="badge badge-success"><i class="ph ph-check-circle"></i> ${d.status}</span></td>
                  <td class="font-mono font-bold">${d.driver_factor}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

// Helper: Authority Screen in Screen 6
function renderAuthorityScreen(sub) {
  const expLabel = document.getElementById("currentAuthExposure");
  const meterFill = document.getElementById("authMeterFill");
  const meterLbl = document.getElementById("authMeterLabel");
  const authBadge = document.getElementById("authCheckBadge");
  const refCard = document.getElementById("referralCard");
  const uwName = document.getElementById("authUnderwriterName");
  const maxLimit = document.getElementById("authMaxLimitDisplay");
  const juniorPanel = document.getElementById("juniorUWPanel");
  const seniorPanel = document.getElementById("seniorUWPanel");
  const noteText = document.getElementById("primaryUWNoteText");

  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  const effectiveLimit = roleConfig.limit;
  const isExceeded = exposureScenario === "exceeds" || (effectiveLimit > 0 && sub.exposureVal > effectiveLimit) || (effectiveLimit === 0);

  if (uwName) {
    uwName.textContent = `${roleConfig.name} (${roleConfig.title})`;
  }

  if (maxLimit) {
    maxLimit.textContent = roleConfig.limitText;
  }

  if (expLabel) expLabel.textContent = isExceeded ? `${sub.exposure} (Exceeds Limit!)` : sub.exposure;

  const pct = effectiveLimit > 0 ? Math.min(100, Math.round((sub.exposureVal / effectiveLimit) * 100)) : 100;
  if (meterFill) {
    meterFill.style.width = `${pct}%`;
    meterFill.style.background = isExceeded ? "#ef4444" : "linear-gradient(90deg, #10b981 0%, #f59e0b 80%, #ef4444 100%)";
  }

  if (meterLbl) {
    meterLbl.textContent = effectiveLimit > 0 
      ? `${pct}% of Assigned Authority (${sub.exposure} / $${(effectiveLimit / 1000000).toFixed(1)}M)`
      : `Exposure: ${sub.exposure} (${roleConfig.limitText})`;
  }

  if (authBadge) {
    if (isExceeded) {
      authBadge.className = "badge badge-danger";
      authBadge.innerHTML = `<i class="ph ph-warning"></i> Authority Exceeded → Senior Referral Required`;
      if (refCard) refCard.style.border = "2px solid #f59e0b";
    } else {
      authBadge.className = "badge badge-success";
      authBadge.innerHTML = `<i class="ph ph-check"></i> Within Assigned Authority Limit`;
      if (refCard) refCard.style.border = "1px solid var(--border-color)";
    }
  }

  // Toggle Junior vs Senior Decision Panels
  if (currentUserRole === "senior" || currentUserRole === "binder") {
    if (juniorPanel) juniorPanel.style.display = "none";
    if (seniorPanel) seniorPanel.style.display = "block";
    if (noteText) {
      noteText.innerHTML = `<strong>Escalation from Primary UW:</strong> Submission exposure of <strong>${sub.exposure}</strong> (${sub.lobName}) reviewed. Operations, safety scoring, and clean loss record verified. Executive referral sign-off requested.`;
    }
  } else {
    if (juniorPanel) juniorPanel.style.display = "block";
    if (seniorPanel) seniorPanel.style.display = "none";
    const jBox = document.getElementById("juniorActionBox");
    if (jBox) {
      if (isExceeded) {
        jBox.innerHTML = `
          <div class="alert alert-warning p-2 mb-2 text-sm" style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; color: #92400e; margin-bottom: 8px;">
            <i class="ph ph-warning"></i> <strong>Exceeds Authority:</strong> Submit escalation referral to Senior CUO (Marcus Vance) for executive review.
          </div>
          <button class="btn btn-warning" id="btnJuniorEscalate" onclick="submitJuniorEscalation()">
            <i class="ph ph-paper-plane-tilt"></i> Submit Escalation Referral to Senior CUO (Marcus Vance)
          </button>
        `;
      } else {
        jBox.innerHTML = `
          <div class="alert alert-success p-2 text-sm" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; color: #166534;">
            <i class="ph ph-check-circle"></i> <strong>Authority Clear:</strong> Submission is within your $2.0M Junior Limit. No referral needed. Proceed to Screen 7 (Rating Engine).
          </div>
        `;
      }
    }
  }
}

function submitJuniorEscalation() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  const text = document.getElementById("juniorEscalationText")?.value || "Risk exposure exceeds authority. Recommending approval.";
  if (sub) {
    sub.statusText = "Senior Referral";
    sub.statusBadge = "badge-warning";
    sub.isReferral = true;
  }
  showToast("📤 Referral Request dispatched to Marcus Vance (CUO Desk)! Switch to Senior UW role from header to review & sign-off.", "warning");
  renderSubmissionsTable();
  refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
  const jBox = document.getElementById("juniorActionBox");
  if (jBox) {
    jBox.innerHTML = `
      <div class="alert alert-info p-2 text-sm" style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px; color: #0369a1;">
        <i class="ph ph-hourglass-medium"></i> <strong>Referral Dispatched:</strong> Awaiting Marcus Vance's CUO Sign-Off. Switch to Senior UW persona from header to act as CUO.
      </div>
    `;
  }
}

// ============================================================================
// 6.7 SCREEN 7: DYNAMIC RATING ENGINE PAYLOAD GENERATOR & EXPORTER
// ============================================================================

function getSubmissionRatingPayload(sub) {
  if (!sub) {
    sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];
  }

  // Parse address for city, state, zip
  let city = "";
  let state = "";
  let zip = "";
  if (sub.address) {
    const parts = sub.address.split(",");
    if (parts.length >= 3) {
      city = parts[parts.length - 3].trim();
      const stateZip = parts[parts.length - 2].trim().split(" ");
      state = stateZip[0] || "";
      zip = stateZip[1] || "";
    } else {
      city = sub.address;
    }
  }

  // Parse vehicle make/model/year from OCR or default
  let vehicleMake = "";
  let vehicleModel = "";
  let vehicleYear = 2024;
  if (sub.ocrFields) {
    const mmField = sub.ocrFields.find(f => f.key.includes("Make") || f.key.includes("Model") || f.key.includes("Vehicle"));
    if (mmField) {
      const parts = mmField.val.split(" ");
      vehicleMake = parts[0] || "";
      vehicleModel = parts.slice(1).join(" ") || "";
    }
    const yField = sub.ocrFields.find(f => f.key.includes("Year"));
    if (yField) {
      vehicleYear = parseInt(yField.val, 10) || 2024;
    }
  }

  return {
    "insured_id": sub.fein ? (parseInt(sub.fein.replace(/\D/g, ""), 10) || 1150142) : 1150142,
    "submission_id": sub.id,
    "quote_id": sub.quoteNo || `QT-${(sub.lobKey || "GEN").toUpperCase()}-2026-8801`,
    "endorsement_number": 0,
    "endorsement_type": null,
    "broker_fee": {
      "amount": sub.channelType === 'broker' ? 2574 : 0,
      "default": sub.channelType === 'broker' ? 1 : 0
    },
    "genInfo": {
      "quotetype": sub.lobName || "Commercial Insurance",
      "application_type_id": 483,
      "company": 210,
      "lob": sub.lobKey || "trucking",
      "policytype": "New Business",
      "billtype": sub.channelType === 'broker' ? "Agency Bill" : "Direct Bill",
      "effective_date": "09/01/2026",
      "expiration_date": "09/01/2027",
      "lock_rate_effective_date": "08/25/2026",
      "business_yrs_exp": "5",
      "binding": sub.currentStep >= 7 ? "yes" : "pending",
      "al_check": true,
      "cargo_check": sub.lobKey === "trucking",
      "pd_check": true
    },
    "insuredInfo": {
      "entity_type": sub.channelType === 'broker' ? "Corporation / LLC" : "Individual / Direct",
      "insured_name": sub.insured || "",
      "fein": sub.fein || "",
      "dot_number": sub.dot || "",
      "address": sub.address || "",
      "insured_garaging_zip": zip || "",
      "insured_garaging_city": city || "",
      "insured_garaging_state": state || (sub.id.split('-').pop() || "TX"),
      "insured_garaging_county": city ? `${city} County` : "",
      "years_of_experience": 5,
      "dot_yes_no": (sub.dot && sub.dot !== "N/A") ? "Yes" : "No",
      "icc_filings_yes_no": "No",
      "description_of_operation": sub.priorityReason || ""
    },
    "coveragesInfo": {
      "rating_type": "Composite Rating Engine",
      "liability": sub.exposureVal || 1000000,
      "al_deductions": 0,
      "pd": "Yes",
      "cargo": sub.lobKey === "trucking" ? "Yes" : "No",
      "cargo_limit": 250000,
      "pd_high_deductible": "5000",
      "pd_deductible_amount": 2500,
      "naics_code": 484110,
      "rating_class": 5,
      "dashcam": "No",
      "al_check": true,
      "pd_check": true,
      "cargo_check": sub.lobKey === "trucking",
      "towing": "10000"
    },
    "filingInfo": {
      "safer_factor": "1.0",
      "FMCSA_alert": "0",
      "uw_credit_debit_factor": sub.priority === 'P1' ? "0.95" : "1.0"
    },
    "radiusOfOperationsInfo": {
      "radius": 450,
      "Intrastate_interstate": "Interstate"
    },
    "serviceInspectionInfo": {
      "number_of_inspection_si": 0,
      "oos_violation_si": 0,
      "account_percent_si": "-",
      "account_percent_driver": "-"
    },
    "commoditiesSelected": [1, 2],
    "commoditiesInfo": {
      "secondary_class": sub.lobName || "Commercial Lines"
    },
    "uwReviewInfo": {
      "driver_factor": 1.0,
      "og_driver_count": (sub.ocrFields && sub.ocrFields.find(f => f.key.includes("Units"))) ? parseInt(sub.ocrFields.find(f => f.key.includes("Units")).val, 10) || 5 : 5,
      "cr_driver_count": 5,
      "al_pollution": "Low",
      "al_pollution_factor": "1.00",
      "uw_credit_debit_factor": "1.0",
      "loss_experience_factor": "1.0",
      "min_earn_factor": 25,
      "broker_fee_amount": sub.channelType === 'broker' ? 2574 : 0,
      "original_driver_exclude_count": 0
    },
    "vehicles": (sub.coverageRows || [{ line: "Coverage Limit", limit: "$1,000,000", ded: "$2,500", prem: "$12,000.00" }]).map((row, idx) => ({
      "id": 903100 + idx,
      "xid": idx + 1,
      "year": vehicleYear,
      "make": vehicleMake || sub.insured.split(" ")[0] || "Unit",
      "model": vehicleModel || "Commercial Vehicle",
      "state_code": state || "TX",
      "zip": zip || "",
      "weight": "Commercial",
      "ownership": "Owned",
      "primary_code": 332,
      "secondary_code": null,
      "rating_class": 5,
      "stated_value": sub.exposureVal || 500000,
      "al_value": Math.round((sub.exposureVal || 500000) * 0.2),
      "miles_driven": 450,
      "no_of_units": 1,
      "no_of_ppt_units": 0,
      "vehicle_age": 2026 - vehicleYear,
      "Liability": "Yes",
      "pd_opted": "Yes",
      "naics_code": 484110,
      "liab_baserate": 837,
      "liab_ilf_factor": 2.06,
      "liab_ded_factor": 0,
      "liab_lcm_factor": 1.67,
      "liab_primary_factor": 1.8,
      "liab_secondary_factor": 1.98,
      "liab_fleet_factor": 0.97,
      "vehicle_age_factor": 1.12,
      "liab_ocn_factor": 1.14,
      "radius_factor": 0.95,
      "naics_factor": 1.1,
      "tort_limitation_factor": 1,
      "miles_driven_factor": 1.03,
      "rating_class_factor": 1,
      "dashcam_factor": 1,
      "cdl_exp_disc_factor": 1,
      "driver_class_factor": 1.0,
      "liab_acc_level_factor": 1,
      "vehicle_owned_factor": 0.95,
      "driver_criteria_factor": 1,
      "payment_plan_factor": 1,
      "heavy_farm_factor": 1,
      "heavy_dumping_factor": 1,
      "uw_credit_debit_factor": 1,
      "al_premium_wo_mod_factor": row.prem || "$10,000",
      "liability_premium": row.prem || "$10,000",
      "pd_premium": row.prem || "$10,000",
      "pd_base_rate": 4.75,
      "pd_deductible_factor": 0.875
    })),
    "drivers": [
      {
        "id": 942561,
        "given_name": (sub.insured || "Primary").split(" ")[0],
        "last_name": (sub.insured || "Insured").split(" ").slice(1).join(" ") || "Insured",
        "dob": "01/01/1990",
        "licensestate": state || "TX",
        "licenseclasstype": "Class A",
        "experience": "5 Years",
        "tenure": 3,
        "exclude": 0,
        "status": "Active Verified",
        "driver_factor": 1.0,
        "violations": []
      }
    ]
  };
}

var RATING_ENGINE_PAYLOAD = getSubmissionRatingPayload(null);

// Helper: Syntax Highlighting for JSON
function syntaxHighlightJSON(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'json-number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json-key';
      } else {
        cls = 'json-string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'json-boolean';
    } else if (/null/.test(match)) {
      cls = 'json-null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

// Helper: Render Screen 7 Rating Engine JSON Viewer & Line Numbers
function renderRatingEnginePayload(sub) {
  const codeBlock = document.getElementById("ratingJSONCodeBlock");
  const gutter = document.getElementById("jsonLineGutter");
  if (!codeBlock) return;

  const payload = getSubmissionRatingPayload(sub);
  RATING_ENGINE_PAYLOAD = payload;

  const jsonStr = JSON.stringify(payload, null, 2);
  codeBlock.innerHTML = syntaxHighlightJSON(jsonStr);

  if (gutter) {
    const lineCount = jsonStr.split("\n").length;
    let linesHtml = "";
    for (let i = 1; i <= lineCount; i++) {
      linesHtml += `<div>${i}</div>`;
    }
    gutter.innerHTML = linesHtml;
  }
}

// Action: Export Rating Payload to CSV
function exportRatingPayloadToCSV() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  const data = getSubmissionRatingPayload(sub);
  let csv = [];

  csv.push("================================================================================");
  csv.push("RATING ENGINE PAYLOAD SUMMARY");
  csv.push("================================================================================");
  csv.push(`Quote ID,${data.quote_id}`);
  csv.push(`Submission ID,${data.submission_id}`);
  csv.push(`Insured ID,${data.insured_id}`);
  csv.push(`Insured Name,"${data.insuredInfo.insured_name}"`);
  csv.push(`Entity Type,"${data.insuredInfo.entity_type}"`);
  csv.push(`Garaging City,"${data.insuredInfo.insured_garaging_city}"`);
  csv.push(`Garaging State,"${data.insuredInfo.insured_garaging_state}"`);
  csv.push(`Garaging Zip,"${data.insuredInfo.insured_garaging_zip}"`);
  csv.push(`Garaging County,"${data.insuredInfo.insured_garaging_county}"`);
  csv.push(`LOB / Quote Type,"${data.genInfo.quotetype}"`);
  csv.push(`Effective Date,"${data.genInfo.effective_date}"`);
  csv.push(`Expiration Date,"${data.genInfo.expiration_date}"`);
  csv.push(`Policy Type,"${data.genInfo.policytype}"`);
  csv.push(`Bill Type,"${data.genInfo.billtype}"`);
  csv.push(`Rating Type,"${data.coveragesInfo.rating_type}"`);
  csv.push(`Liability Limit,${data.coveragesInfo.liability}`);
  csv.push(`PD Deductible Amount,${data.coveragesInfo.pd_deductible_amount}`);
  csv.push(`PD High Deductible,${data.coveragesInfo.pd_high_deductible}`);
  csv.push(`Towing Limit,${data.coveragesInfo.towing}`);
  csv.push(`Broker Fee Amount,${data.broker_fee.amount}`);
  csv.push(`Driver Factor,${data.uwReviewInfo.driver_factor}`);
  csv.push(`Original Driver Count,${data.uwReviewInfo.og_driver_count}`);
  csv.push(`Driver Exclude Count,${data.uwReviewInfo.original_driver_exclude_count}`);
  csv.push(`AL Pollution,${data.uwReviewInfo.al_pollution}`);
  csv.push(`AL Pollution Factor,${data.uwReviewInfo.al_pollution_factor}`);
  csv.push("");

  csv.push("================================================================================");
  csv.push("VEHICLES SCHEDULE");
  csv.push("================================================================================");
  const vHeaders = [
    "Vehicle ID", "Unit #", "Year", "Make", "Model", "State", "Zip", "Weight", "Ownership",
    "Stated Value", "AL Value", "Miles Driven", "Vehicle Age", "Liability Opted", "PD Opted",
    "NAICS Code", "Liab Base Rate", "Liab ILF Factor", "Liab LCM Factor", "Liab Primary Factor",
    "Liab Secondary Factor", "Fleet Factor", "Vehicle Age Factor", "Radius Factor", "NAICS Factor",
    "Driver Class Factor", "AL Premium w/o Mod", "Liability Premium", "PD Base Rate", "PD Deductible Factor", "PD Premium"
  ];
  csv.push(vHeaders.map(h => `"${h}"`).join(","));
  data.vehicles.forEach(v => {
    const row = [
      v.id, v.xid, v.year, `"${v.make}"`, `"${v.model}"`, `"${v.state_code}"`, `"${v.zip}"`, `"${v.weight}"`, `"${v.ownership}"`,
      v.stated_value, v.al_value, v.miles_driven, v.vehicle_age, `"${v.Liability}"`, `"${v.pd_opted}"`,
      v.naics_code, v.liab_baserate, v.liab_ilf_factor, v.liab_lcm_factor, v.liab_primary_factor,
      v.liab_secondary_factor, v.liab_fleet_factor, v.vehicle_age_factor, v.radius_factor, v.naics_factor,
      v.driver_class_factor, v.al_premium_wo_mod_factor, v.liability_premium, v.pd_base_rate, v.pd_deductible_factor, v.pd_premium
    ];
    csv.push(row.join(","));
  });
  csv.push("");

  csv.push("================================================================================");
  csv.push("DRIVERS SCHEDULE");
  csv.push("================================================================================");
  const dHeaders = [
    "Driver ID", "Given Name", "Last Name", "DOB", "License State", "Class Type", "Experience Yrs",
    "Tenure Yrs", "Excluded", "Status", "Driver Factor", "Violations Count", "Violation Details"
  ];
  csv.push(dHeaders.map(h => `"${h}"`).join(","));
  data.drivers.forEach(d => {
    const violStr = (d.violations || []).map(v => `Code ${v.violation} (${v.violationDate || 'N/A'})`).join("; ");
    const row = [
      d.id, `"${d.given_name}"`, `"${d.last_name}"`, `"${d.dob}"`, `"${d.licensestate}"`, `"${d.licenseclasstype}"`,
      `"${d.experience || 0}"`, d.tenure, d.exclude, `"${d.status}"`, d.driver_factor,
      (d.violations || []).length, `"${violStr}"`
    ];
    csv.push(row.join(","));
  });

  const csvContent = "\uFEFF" + csv.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Rating_Payload_${data.submission_id}_${data.quote_id}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast("📊 Rating Payload exported to CSV successfully!", "success");
}

// Action: Copy Rating JSON to Clipboard
function copyRatingJSON() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  const data = getSubmissionRatingPayload(sub);
  const jsonStr = JSON.stringify(data, null, 2);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(jsonStr).then(() => {
      showToast("📋 Rating Payload JSON copied to clipboard!", "success");
    }).catch(() => {
      fallbackCopyText(jsonStr);
    });
  } else {
    fallbackCopyText(jsonStr);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
    showToast("📋 Rating Payload JSON copied to clipboard!", "success");
  } catch (err) {
    showToast("Could not copy JSON", "warning");
  }
  document.body.removeChild(textArea);
}

// Action: Download Rating JSON File
function downloadRatingJSON() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  const data = getSubmissionRatingPayload(sub);
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Rating_Payload_${data.submission_id}_${data.quote_id}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast("📥 Rating Payload JSON downloaded!", "success");
}

// Action: Toggle Line Wrapping in Code Block
function toggleJSONWrap() {
  const codeBlock = document.getElementById("ratingJSONCodeBlock");
  const btn = document.getElementById("btnToggleWrap");
  if (!codeBlock) return;
  codeBlock.parentElement.classList.toggle("wrap-lines");
  const isWrapped = codeBlock.parentElement.classList.contains("wrap-lines");
  if (btn) {
    btn.innerHTML = isWrapped 
      ? `<i class="ph ph-text-align-left"></i> No Wrap` 
      : `<i class="ph ph-text-aa"></i> Wrap Lines`;
  }
}

// Helper: Quote PDF Preview in Screen 8
function renderQuotePDF(sub) {
  const qNo = document.getElementById("pdfQuoteNo");
  const qIns = document.getElementById("pdfInsuredName");
  const qAdd = document.getElementById("pdfInsuredAddress");
  const qBrok = document.getElementById("pdfBrokerName");

  if (qNo) qNo.textContent = sub.quoteNo;
  if (qIns) qIns.textContent = sub.insured;
  if (qAdd) qAdd.innerHTML = sub.address.replace(", ", "<br>");
  if (qBrok) qBrok.textContent = sub.broker;

  const rows = document.getElementById("pdfCoverageRows");
  if (rows && sub.coverageRows) {
    rows.innerHTML = sub.coverageRows.map(c => `
      <tr>
        <td><strong>${c.line}</strong></td>
        <td>${c.limit}</td>
        <td>${c.ded}</td>
        <td class="font-mono font-bold">${c.prem}</td>
      </tr>
    `).join("");
  }

  const subjs = document.getElementById("pdfSubjectivitiesList");
  if (subjs && sub.subjectivities) {
    subjs.innerHTML = sub.subjectivities.map((s, idx) => `
      <li>${idx + 1}. ${s}</li>
    `).join("");
  }
}

// ============================================================================
// ALL 7 STEPS CASE SUMMARY & AUDIT MODAL CONTROLLER (Screen 8)
// ============================================================================

let summaryModalActiveTab = "all";

function openAllStepsSummaryModal() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];
  if (!sub) return;

  renderAllStepsSummaryModal(sub);
  switchSummaryModalTab("all");

  const modal = document.getElementById("allStepsSummaryModal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeAllStepsSummaryModal() {
  const modal = document.getElementById("allStepsSummaryModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function switchSummaryModalTab(tabKey) {
  summaryModalActiveTab = tabKey;

  // Update tab button styles
  const buttons = document.querySelectorAll("#summaryModalStepTabs .s-tab-btn");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-tab") === tabKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Filter cards in modal body
  const cards = document.querySelectorAll("#allStepsSummaryModalBody .summary-step-card");
  cards.forEach(card => {
    if (tabKey === "all") {
      card.style.display = "block";
    } else {
      const stepId = card.getAttribute("data-step-card");
      if (stepId === tabKey) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });
}

function renderAllStepsSummaryModal(sub) {
  const strip = document.getElementById("summaryModalAccountStrip");
  const body = document.getElementById("allStepsSummaryModalBody");
  if (!strip || !body) return;

  // 1. Render Top Metadata Strip
  strip.innerHTML = `
    <div class="summary-strip-item">
      <span class="summary-strip-label">Named Insured</span>
      <span class="summary-strip-val" title="${sub.insured}">${sub.insured}</span>
    </div>
    <div class="summary-strip-item">
      <span class="summary-strip-label">Submission ID</span>
      <span class="summary-strip-val font-mono">${sub.id}</span>
    </div>
    <div class="summary-strip-item">
      <span class="summary-strip-label">Quote Number</span>
      <span class="summary-strip-val font-mono text-primary">${sub.quoteNo || 'QT-2026-89412'}</span>
    </div>
    <div class="summary-strip-item">
      <span class="summary-strip-label">FEIN</span>
      <span class="summary-strip-val font-mono">${sub.fein}</span>
    </div>
    <div class="summary-strip-item">
      <span class="summary-strip-label">Line of Business</span>
      <span class="summary-strip-val">${sub.lobName}</span>
    </div>
    <div class="summary-strip-item">
      <span class="summary-strip-label">Producing Broker</span>
      <span class="summary-strip-val" title="${sub.broker}">${sub.broker.split(' ')[0]}</span>
    </div>
    <div class="summary-strip-item">
      <span class="summary-strip-label">Assigned Desk / UW</span>
      <span class="summary-strip-val">${sub.underwriter ? sub.underwriter.split(' ')[0] : 'Open Queue'}</span>
    </div>
    <div class="summary-strip-item">
      <span class="summary-strip-label">Gross Premium</span>
      <span class="summary-strip-val text-success font-bold">$48,600.00</span>
    </div>
  `;

  // 2. Render All 7 Step Cards
  body.innerHTML = `
    <!-- STEP 1: DOC INGESTION & SCHEMA / OCR -->
    <div class="summary-step-card" data-step-card="step1">
      <div class="summary-step-header">
        <div class="summary-step-title-box">
          <span class="summary-step-badge">1</span>
          <div>
            <div class="summary-step-title">Step 1: Document Ingestion & Optical Character Recognition (OCR)</div>
            <div class="summary-step-desc">Document ingestion pipeline, file validation, OCR parsing, and canonical entity schema creation.</div>
          </div>
        </div>
        <span class="badge badge-success"><i class="ph ph-check-circle"></i> 99.4% OCR Confidence</span>
      </div>
      <div class="summary-step-grid">
        <div class="summary-field-box">
          <div class="summary-field-label">Ingested Files (${(sub.docs || []).length})</div>
          <div class="summary-field-val">${(sub.docs || []).map(d => d.name).join(', ')}</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Entity Type & Structure</div>
          <div class="summary-field-val">${sub.entityType || 'Commercial LLC'} • DOT: 3948102</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Operating Address</div>
          <div class="summary-field-val">${sub.address || '10440 Highway 290 West, Houston, TX 77040'}</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Effective Term</div>
          <div class="summary-field-val">${sub.effectiveDate || '09/01/2026'} to 09/01/2027 (12 Mo)</div>
        </div>
      </div>
    </div>

    <!-- STEP 2: CLEARANCE & APPETITE CHECK -->
    <div class="summary-step-card" data-step-card="step2">
      <div class="summary-step-header">
        <div class="summary-step-title-box">
          <span class="summary-step-badge">2</span>
          <div>
            <div class="summary-step-title">Step 2: FEIN Clearance & Appetite Knockout Screening</div>
            <div class="summary-step-desc">Duplicate FEIN broker of record lock check, carrier appetite rules validation, and knockout verification.</div>
          </div>
        </div>
        <span class="badge badge-success"><i class="ph ph-shield-check"></i> 10/10 Appetite Rules Passed</span>
      </div>
      <div class="summary-step-grid">
        <div class="summary-field-box">
          <div class="summary-field-label">FEIN Clearance Status</div>
          <div class="summary-field-val text-success">Cleared • FEIN ${sub.fein} Locked to ${sub.broker.split(' ')[0]}</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Commodity & Hazard Eligibility</div>
          <div class="summary-field-val">General Freight / Dry Van (Non-Hazmat) — Eligible</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Operating Radius Guidelines</div>
          <div class="summary-field-val">Regional 450-Mile Radius (Max Allowed 750 Miles) — Passed</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Knockout Checkpoints</div>
          <div class="summary-field-val text-success">0 Violations • No Dual-Broker Conflicts Detected</div>
        </div>
      </div>
    </div>

    <!-- STEP 3: DATA ENRICHMENT & ROUTING -->
    <div class="summary-step-card" data-step-card="step3">
      <div class="summary-step-header">
        <div class="summary-step-title-box">
          <span class="summary-step-badge">3</span>
          <div>
            <div class="summary-step-title">Step 3: Third-Party Data Enrichment & Automated Routing</div>
            <div class="summary-step-desc">External API data enrichment (CAB, SAFER/FMCSA, LexisNexis, ISO) and smart underwriter queue routing.</div>
          </div>
        </div>
        <span class="badge badge-info"><i class="ph ph-tree-structure"></i> Verified Live APIs</span>
      </div>
      <div class="summary-step-grid">
        <div class="summary-field-box">
          <div class="summary-field-label">SAFER / FMCSA Safety Rating</div>
          <div class="summary-field-val">Satisfactory • 0 OOS Violations • Safer Alert: 1.00</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">ISO / CAB Telematics Score</div>
          <div class="summary-field-val">Tier-1 Safety Profile • ISO Class 3 Public Protection</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Assigned Underwriter & Desk</div>
          <div class="summary-field-val">${sub.underwriter || 'Sarah Jenkins'} • ${sub.desk || 'Specialty Transportation Desk'}</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">SLA Target & Priority Score</div>
          <div class="summary-field-val"><span class="badge ${sub.priority === 'P1' ? 'badge-danger' : 'badge-warning'}">${sub.priority} Priority</span> (Score: ${sub.priorityScore || 92}/100)</div>
        </div>
      </div>
    </div>

    <!-- STEP 4: UNDERWRITING WORKBENCH -->
    <div class="summary-step-card" data-step-card="step4">
      <div class="summary-step-header">
        <div class="summary-step-title-box">
          <span class="summary-step-badge">4</span>
          <div>
            <div class="summary-step-title">Step 4: Underwriting Workbench, Loss Runs & Subjectivities</div>
            <div class="summary-step-desc">5-year historical loss triangulation, ACORD application audit, subjectivities tracking, and RFI log.</div>
          </div>
        </div>
        <span class="badge badge-success"><i class="ph ph-chart-line"></i> 14.8% Favorable Loss Ratio</span>
      </div>
      <div class="summary-step-grid">
        <div class="summary-field-box">
          <div class="summary-field-label">5-Year Prior Claims Triangulation</div>
          <div class="summary-field-val">2 Claims • $12,400 Total Incurred • 0 Open Reserves</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Calculated Loss Ratio</div>
          <div class="summary-field-val text-success">14.8% (Carrier Benchmark: &lt; 55.0%) — Highly Favorable</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Active Subjectivities (${(sub.subjectivities || []).length})</div>
          <div class="summary-field-val">MVR driver check, Signed ACORD on file</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">RFI & Broker Communications</div>
          <div class="summary-field-val text-success">All inquiries resolved • No outstanding documentation blocks</div>
        </div>
      </div>
    </div>

    <!-- STEP 5: AUTHORITY DESK & CUO REFERRAL -->
    <div class="summary-step-card" data-step-card="step5">
      <div class="summary-step-header">
        <div class="summary-step-title-box">
          <span class="summary-step-badge">5</span>
          <div>
            <div class="summary-step-title">Step 5: Authority Delegation & CUO Referral Desk</div>
            <div class="summary-step-desc">Underwriting limits verification, Junior-to-Senior escalation workflow, and formal CUO sign-off.</div>
          </div>
        </div>
        <span class="badge badge-success"><i class="ph ph-stamp"></i> Executive CUO Signed Off</span>
      </div>
      <div class="summary-step-grid">
        <div class="summary-field-box">
          <div class="summary-field-label">Total Exposure Value</div>
          <div class="summary-field-val font-mono">${sub.exposure || '$3,200,000 TIV / Fleet'}</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Primary UW Authority Limit</div>
          <div class="summary-field-val">$2,000,000 (Level-2 Sarah Jenkins)</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Escalation Rationale</div>
          <div class="summary-field-val">Exceeds $2.0M limit • Safety and clean loss record justified referral</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">CUO Authority Sign-Off</div>
          <div class="summary-field-val text-success font-bold">APPROVED by Marcus Vance (Chief Underwriting Officer)</div>
        </div>
      </div>
    </div>

    <!-- STEP 6: RATING ENGINE & ACTUARIAL PAYLOAD -->
    <div class="summary-step-card" data-step-card="step6">
      <div class="summary-step-header">
        <div class="summary-step-title-box">
          <span class="summary-step-badge">6</span>
          <div>
            <div class="summary-step-title">Step 6: Actuarial Rating Engine & Multi-Line Pricing Payload</div>
            <div class="summary-step-desc">Automated rating engine calculation, vehicle schedules, driver multipliers, and actuarial payload schema.</div>
          </div>
        </div>
        <span class="badge badge-primary"><i class="ph ph-calculator"></i> Actuarially Rated</span>
      </div>
      <div class="summary-step-grid">
        <div class="summary-field-box">
          <div class="summary-field-label">Rating Model</div>
          <div class="summary-field-val">Composite Transportation Pricing (Units × Radius × Factor)</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Schedules Summary</div>
          <div class="summary-field-val">1 Scheduled Power Unit ($500k Value) • 4 Drivers (3 Active, 1 Excl)</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Liability & PD Premium Subtotals</div>
          <div class="summary-field-val font-mono">Liability: $31,360.00 • Physical Damage: $42,070.00</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Actuarial Payload Schema</div>
          <div class="summary-field-val text-success">Verified Production JSON Payload • Exportable to CSV</div>
        </div>
      </div>
    </div>

    <!-- STEP 7: QUOTE & BINDING PACKET -->
    <div class="summary-step-card" data-step-card="step7">
      <div class="summary-step-header">
        <div class="summary-step-title-box">
          <span class="summary-step-badge">7</span>
          <div>
            <div class="summary-step-title">Step 7: Formal Bindable Quote & Policy Issuance Terms</div>
            <div class="summary-step-desc">Official quote document generation, subjectivity verification, binding studio, and policy packet issuance.</div>
          </div>
        </div>
        <span class="badge badge-success"><i class="ph ph-lock"></i> Bind Ready & Verified</span>
      </div>
      <div class="summary-step-grid">
        <div class="summary-field-box">
          <div class="summary-field-label">Official Quote Document</div>
          <div class="summary-field-val font-mono font-bold text-primary">${sub.quoteNo || 'QT-2026-89412'} (Valid 30 Days)</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Annual Gross Premium</div>
          <div class="summary-field-val text-success font-bold font-mono" style="font-size: 14px;">$48,600.00</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Issuance Recipient Target</div>
          <div class="summary-field-val"><i class="ph ph-paper-plane-tilt text-primary"></i> ${sub.channel === 'direct' ? 'Direct Customer Portal & Insured Email' : 'Producing Broker Agency (' + sub.broker.split(' ')[0] + ')'}</div>
        </div>
        <div class="summary-field-box">
          <div class="summary-field-label">Binding Pass Authority</div>
          <div class="summary-field-val text-success font-bold"><i class="ph ph-file-text"></i> Passed & Authorized by Binding Specialist (Elena Rostova)</div>
        </div>
      </div>
    </div>
  `;
}

function renderStep7InlineSummary(sub) {
  const container = document.getElementById("step7InlineSummaryContainer");
  if (!container) return;
  if (!sub) sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];

  container.innerHTML = `
    <!-- Top Metadata Account Strip -->
    <div class="summary-account-strip mb-3">
      <div class="summary-strip-item">
        <span class="summary-strip-label">Named Insured</span>
        <span class="summary-strip-val" title="${sub.insured}">${sub.insured}</span>
      </div>
      <div class="summary-strip-item">
        <span class="summary-strip-label">Submission ID</span>
        <span class="summary-strip-val font-mono">${sub.id}</span>
      </div>
      <div class="summary-strip-item">
        <span class="summary-strip-label">Quote Number</span>
        <span class="summary-strip-val font-mono text-primary">${sub.quoteNo || 'QT-2026-89412'}</span>
      </div>
      <div class="summary-strip-item">
        <span class="summary-strip-label">FEIN</span>
        <span class="summary-strip-val font-mono">${sub.fein}</span>
      </div>
      <div class="summary-strip-item">
        <span class="summary-strip-label">Line of Business</span>
        <span class="summary-strip-val">${sub.lobName}</span>
      </div>
      <div class="summary-strip-item">
        <span class="summary-strip-label">Producing Broker</span>
        <span class="summary-strip-val" title="${sub.broker}">${sub.broker.split(' ')[0]}</span>
      </div>
      <div class="summary-strip-item">
        <span class="summary-strip-label">Assigned Desk / UW</span>
        <span class="summary-strip-val">${sub.underwriter ? sub.underwriter.split(' ')[0] : 'Open Queue'}</span>
      </div>
      <div class="summary-strip-item">
        <span class="summary-strip-label">Gross Premium</span>
        <span class="summary-strip-val text-success font-bold">$48,600.00</span>
      </div>
    </div>

    <!-- 7 Lifecycle Step Cards Container -->
    <div class="summary-cards-list">
      <!-- STEP 1: DOC INGESTION & SCHEMA / OCR -->
      <div class="summary-step-card" data-step-card="step1">
        <div class="summary-step-header">
          <div class="summary-step-title-box">
            <span class="summary-step-badge">1</span>
            <div>
              <div class="summary-step-title">Step 1: Document Ingestion & Optical Character Recognition (OCR)</div>
              <div class="summary-step-desc">Document ingestion pipeline, file validation, OCR parsing, and canonical entity schema creation.</div>
            </div>
          </div>
          <span class="badge badge-success"><i class="ph ph-check-circle"></i> 99.4% OCR Confidence</span>
        </div>
        <div class="summary-step-grid">
          <div class="summary-field-box">
            <div class="summary-field-label">Ingested Files (${(sub.docs || []).length})</div>
            <div class="summary-field-val">${(sub.docs || []).map(d => d.name).join(', ')}</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Entity Type & Structure</div>
            <div class="summary-field-val">${sub.entityType || 'Commercial LLC'} • DOT: 3948102</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Operating Address</div>
            <div class="summary-field-val">${sub.address || '10440 Highway 290 West, Houston, TX 77040'}</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Effective Term</div>
            <div class="summary-field-val">${sub.effectiveDate || '09/01/2026'} to 09/01/2027 (12 Mo)</div>
          </div>
        </div>
      </div>

      <!-- STEP 2: CLEARANCE & APPETITE CHECK -->
      <div class="summary-step-card" data-step-card="step2">
        <div class="summary-step-header">
          <div class="summary-step-title-box">
            <span class="summary-step-badge">2</span>
            <div>
              <div class="summary-step-title">Step 2: FEIN Clearance & Appetite Knockout Screening</div>
              <div class="summary-step-desc">Duplicate FEIN broker of record lock check, carrier appetite rules validation, and knockout verification.</div>
            </div>
          </div>
          <span class="badge badge-success"><i class="ph ph-shield-check"></i> 10/10 Appetite Rules Passed</span>
        </div>
        <div class="summary-step-grid">
          <div class="summary-field-box">
            <div class="summary-field-label">FEIN Clearance Status</div>
            <div class="summary-field-val text-success">Cleared • FEIN ${sub.fein} Locked to ${sub.broker.split(' ')[0]}</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Commodity & Hazard Eligibility</div>
            <div class="summary-field-val">General Freight / Dry Van (Non-Hazmat) — Eligible</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Operating Radius Guidelines</div>
            <div class="summary-field-val">Regional 450-Mile Radius (Max Allowed 750 Miles) — Passed</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Knockout Checkpoints</div>
            <div class="summary-field-val text-success">0 Violations • No Dual-Broker Conflicts Detected</div>
          </div>
        </div>
      </div>

      <!-- STEP 3: DATA ENRICHMENT & ROUTING -->
      <div class="summary-step-card" data-step-card="step3">
        <div class="summary-step-header">
          <div class="summary-step-title-box">
            <span class="summary-step-badge">3</span>
            <div>
              <div class="summary-step-title">Step 3: Third-Party Data Enrichment & Automated Routing</div>
              <div class="summary-step-desc">External API data enrichment (CAB, SAFER/FMCSA, LexisNexis, ISO) and smart underwriter queue routing.</div>
            </div>
          </div>
          <span class="badge badge-info"><i class="ph ph-tree-structure"></i> Verified Live APIs</span>
        </div>
        <div class="summary-step-grid">
          <div class="summary-field-box">
            <div class="summary-field-label">SAFER / FMCSA Safety Rating</div>
            <div class="summary-field-val">Satisfactory • 0 OOS Violations • Safer Alert: 1.00</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">ISO / CAB Telematics Score</div>
            <div class="summary-field-val">Tier-1 Safety Profile • ISO Class 3 Public Protection</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Assigned Underwriter & Desk</div>
            <div class="summary-field-val">${sub.underwriter || 'Sarah Jenkins'} • ${sub.desk || 'Specialty Transportation Desk'}</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">SLA Target & Priority Score</div>
            <div class="summary-field-val"><span class="badge ${sub.priority === 'P1' ? 'badge-danger' : 'badge-warning'}">${sub.priority} Priority</span> (Score: ${sub.priorityScore || 92}/100)</div>
          </div>
        </div>
      </div>

      <!-- STEP 4: UNDERWRITING WORKBENCH -->
      <div class="summary-step-card" data-step-card="step4">
        <div class="summary-step-header">
          <div class="summary-step-title-box">
            <span class="summary-step-badge">4</span>
            <div>
              <div class="summary-step-title">Step 4: Underwriting Workbench, Loss Runs & Subjectivities</div>
              <div class="summary-step-desc">5-year historical loss triangulation, ACORD application audit, subjectivities tracking, and RFI log.</div>
            </div>
          </div>
          <span class="badge badge-success"><i class="ph ph-chart-line"></i> 14.8% Favorable Loss Ratio</span>
        </div>
        <div class="summary-step-grid">
          <div class="summary-field-box">
            <div class="summary-field-label">5-Year Prior Claims Triangulation</div>
            <div class="summary-field-val">2 Claims • $12,400 Total Incurred • 0 Open Reserves</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Calculated Loss Ratio</div>
            <div class="summary-field-val text-success">14.8% (Carrier Benchmark: &lt; 55.0%) — Highly Favorable</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Active Subjectivities (${(sub.subjectivities || []).length})</div>
            <div class="summary-field-val">MVR driver check, Signed ACORD on file</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">RFI & Broker Communications</div>
            <div class="summary-field-val text-success">All inquiries resolved • No outstanding documentation blocks</div>
          </div>
        </div>
      </div>

      <!-- STEP 5: AUTHORITY DESK & CUO REFERRAL -->
      <div class="summary-step-card" data-step-card="step5">
        <div class="summary-step-header">
          <div class="summary-step-title-box">
            <span class="summary-step-badge">5</span>
            <div>
              <div class="summary-step-title">Step 5: Authority Delegation & CUO Referral Desk</div>
              <div class="summary-step-desc">Underwriting limits verification, Junior-to-Senior escalation workflow, and formal CUO sign-off.</div>
            </div>
          </div>
          <span class="badge badge-success"><i class="ph ph-stamp"></i> Executive CUO Signed Off</span>
        </div>
        <div class="summary-step-grid">
          <div class="summary-field-box">
            <div class="summary-field-label">Total Exposure Value</div>
            <div class="summary-field-val font-mono">${sub.exposure || '$3,200,000 TIV / Fleet'}</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Primary UW Authority Limit</div>
            <div class="summary-field-val">$2,000,000 (Level-2 Sarah Jenkins)</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Escalation Rationale</div>
            <div class="summary-field-val">Exceeds $2.0M limit • Safety and clean loss record justified referral</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">CUO Authority Sign-Off</div>
            <div class="summary-field-val text-success font-bold">APPROVED by Marcus Vance (Chief Underwriting Officer)</div>
          </div>
        </div>
      </div>

      <!-- STEP 6: RATING ENGINE & ACTUARIAL PAYLOAD -->
      <div class="summary-step-card" data-step-card="step6">
        <div class="summary-step-header">
          <div class="summary-step-title-box">
            <span class="summary-step-badge">6</span>
            <div>
              <div class="summary-step-title">Step 6: Actuarial Rating Engine & Multi-Line Pricing Payload</div>
              <div class="summary-step-desc">Automated rating engine calculation, vehicle schedules, driver multipliers, and actuarial payload schema.</div>
            </div>
          </div>
          <span class="badge badge-primary"><i class="ph ph-calculator"></i> Actuarially Rated</span>
        </div>
        <div class="summary-step-grid">
          <div class="summary-field-box">
            <div class="summary-field-label">Rating Model</div>
            <div class="summary-field-val">Composite Transportation Pricing (Units × Radius × Factor)</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Schedules Summary</div>
            <div class="summary-field-val">1 Scheduled Power Unit ($500k Value) • 4 Drivers (3 Active, 1 Excl)</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Liability & PD Premium Subtotals</div>
            <div class="summary-field-val font-mono">Liability: $31,360.00 • Physical Damage: $42,070.00</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Actuarial Payload Schema</div>
            <div class="summary-field-val text-success">Verified Production JSON Payload • Exportable to CSV</div>
          </div>
        </div>
      </div>

      <!-- STEP 7: QUOTE & BINDING PACKET -->
      <div class="summary-step-card" data-step-card="step7">
        <div class="summary-step-header">
          <div class="summary-step-title-box">
            <span class="summary-step-badge">7</span>
            <div>
              <div class="summary-step-title">Step 7: Formal Bindable Quote & Policy Issuance Terms</div>
              <div class="summary-step-desc">Official quote document generation, subjectivity verification, binding studio, and policy packet issuance.</div>
            </div>
          </div>
          <span class="badge badge-success"><i class="ph ph-lock"></i> Bind Ready & Verified</span>
        </div>
        <div class="summary-step-grid">
          <div class="summary-field-box">
            <div class="summary-field-label">Official Quote Document</div>
            <div class="summary-field-val font-mono font-bold text-primary">${sub.quoteNo || 'QT-2026-89412'} (Valid 30 Days)</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Annual Gross Premium</div>
            <div class="summary-field-val text-success font-bold font-mono" style="font-size: 14px;">$48,600.00</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Issuance Recipient Target</div>
            <div class="summary-field-val"><i class="ph ph-paper-plane-tilt text-primary"></i> ${sub.channel === 'direct' ? 'Direct Customer Portal & Insured Email' : 'Producing Broker Agency (' + sub.broker.split(' ')[0] + ')'}</div>
          </div>
          <div class="summary-field-box">
            <div class="summary-field-label">Binding Pass Authority</div>
            <div class="summary-field-val text-success font-bold"><i class="ph ph-file-text"></i> Passed & Authorized by Binding Specialist (Elena Rostova)</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 6B. STEP 7: ACTUARIAL IMPORTED RATING ENGINE & FINAL QUOTE STUDIO
// ============================================================================
const DEFAULT_IMPORTED_RATING_JSON = {
  "quote": {
    "lob": "Commercial Trucking",
    "state": "TX",
    "ratingVersion": "v2026.03",
    "coveragePremium": 35062,
    "discounts": [
      {
        "name": "Claims-Free Credit",
        "value": -0.08,
        "amt": -2805,
        "why": "No claims in prior 3 years"
      }
    ],
    "surcharges": [],
    "creditsNotApplied": [
      {
        "name": "Renewal Discount",
        "code": "DISC_RENEWAL",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      },
      {
        "name": "CDL Experience Discount",
        "code": "DISC_CDL",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      },
      {
        "name": "Dashcam / Telematics",
        "code": "DISC_DASHCAM",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      },
      {
        "name": "Multi-Policy Discount",
        "code": "DISC_MULTI",
        "reason": "Submission does not carry the data to evaluate: Bundled with GL or Property",
        "undetermined": true
      },
      {
        "name": "Paid-In-Full Discount",
        "code": "DISC_PIF",
        "reason": "Condition not met: Premium paid in full at binding",
        "undetermined": false
      },
      {
        "name": "Safety Program Credit",
        "code": "DISC_SAFETY",
        "reason": "Submission does not carry the data to evaluate: Documented written safety program",
        "undetermined": true
      },
      {
        "name": "FMCSA Alert Surcharge",
        "code": "SUR_FMCSA",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      },
      {
        "name": "OOS Vehicle Violations",
        "code": "SUR_OOSV",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      },
      {
        "name": "OOS Driver Violations",
        "code": "SUR_OOSD",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      },
      {
        "name": "Hazmat Operations",
        "code": "SUR_HAZMAT",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      },
      {
        "name": "High-Risk Driver",
        "code": "SUR_DRV",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      },
      {
        "name": "No Dashcam Surcharge",
        "code": "SUR_NODASH",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      },
      {
        "name": "Unassigned Driver",
        "code": "SUR_UNASSIGN",
        "reason": "Submission does not carry the data to evaluate: Vehicle with no rated driver assigned",
        "undetermined": true
      },
      {
        "name": "New Venture Debit",
        "code": "SUR_NEWVEN",
        "reason": "Already priced in the rating chain",
        "undetermined": false
      }
    ],
    "fees": [
      {
        "name": "Policy Fee",
        "code": "FEE_POLICY",
        "valueType": "Fixed",
        "unit": 150,
        "qty": 1,
        "amt": 150,
        "chargeType": "Per Policy",
        "taxable": false
      },
      {
        "name": "Broker Fee",
        "code": "FEE_BROKER",
        "valueType": "Percent",
        "pct": 8,
        "percentOf": "Premium Before Fees",
        "base": 32257,
        "capped": "max",
        "minFee": 250,
        "maxFee": 2500,
        "qty": 1,
        "amt": 2500,
        "chargeType": "Per Policy",
        "taxable": false
      },
      {
        "name": "Inspection Fee",
        "code": "FEE_INSPECT",
        "valueType": "Fixed",
        "unit": 75,
        "qty": 1,
        "amt": 75,
        "chargeType": "Per Policy",
        "taxable": false
      },
      {
        "name": "Driver Surcharge Fee",
        "code": "FEE_DRVSUR",
        "valueType": "Fixed",
        "unit": 85,
        "qty": 2,
        "amt": 170,
        "chargeType": "Per Driver",
        "taxable": false
      },
      {
        "name": "MVR / CSA Report Fee",
        "code": "FEE_MVR",
        "valueType": "Fixed",
        "unit": 12,
        "qty": 3,
        "amt": 36,
        "chargeType": "Per Driver",
        "taxable": false
      },
      {
        "name": "Vehicle Inspection Fee",
        "code": "FEE_VEHINSP",
        "valueType": "Fixed",
        "unit": 45,
        "qty": 1,
        "amt": 45,
        "chargeType": "Per Vehicle",
        "taxable": false
      },
      {
        "name": "Managing General Agent Fee",
        "code": "FEE_MGA",
        "valueType": "Percent",
        "pct": 5,
        "percentOf": "Premium Before Fees",
        "base": 32257,
        "capped": null,
        "minFee": 100,
        "maxFee": 0,
        "qty": 1,
        "amt": 1613,
        "chargeType": "Per Policy",
        "taxable": false
      },
      {
        "name": "Surplus Lines Filing Fee",
        "code": "FEE_SLFILE",
        "valueType": "Percent",
        "pct": 0.35,
        "percentOf": "Premium + Taxes",
        "base": 33821,
        "capped": null,
        "minFee": 25,
        "maxFee": 500,
        "qty": 1,
        "amt": 118,
        "chargeType": "Per Policy",
        "taxable": false
      },
      {
        "name": "Terrorism (TRIA) Charge",
        "code": "FEE_TRIA",
        "valueType": "Percent",
        "pct": 1.5,
        "percentOf": "Coverage Premium",
        "base": 35062,
        "capped": null,
        "minFee": 0,
        "maxFee": 0,
        "qty": 1,
        "amt": 526,
        "chargeType": "Per Policy",
        "taxable": true
      }
    ],
    "taxPct": 0.048499999999999995,
    "tax": 1590,
    "countyName": "Denton County",
    "countyRate": 0.55,
    "countyTax": 180,
    "finalPremium": 39260,
    "minimumApplied": false
  },
  "coverages": [
    {
      "name": "Auto Liability",
      "subtotal": 15440,
      "factors": [
        {
          "label": "Territory Base Loss Cost (per unit)",
          "value": 837,
          "base": null,
          "driver": "Garaging State + ZIP",
          "input": "TX 76262",
          "matched": "CA_Liab_LC — TX territory 027 (from ZIP 76262)"
        },
        {
          "label": "Increased Limits Factor (ILF)",
          "value": 2.06,
          "base": 1,
          "driver": "Liability Limit",
          "input": "$1,000,000",
          "matched": "$1,000,000 limit in TX"
        },
        {
          "label": "Liability Deductible Factor",
          "value": 0,
          "base": 0,
          "driver": "Liability Deductible",
          "input": "$0",
          "matched": "$0 deductible × 0.75 program deviation"
        },
        {
          "label": "Loss Cost Multiplier (LCM)",
          "value": 1.67,
          "base": 1.67,
          "driver": null,
          "input": null,
          "matched": "Program constant — same for every quote"
        },
        {
          "label": "Primary Class Factor",
          "value": 1.8,
          "base": null,
          "driver": "Vehicle Class (per unit)",
          "input": "Heavy Truck-Tractor - Long Distance D",
          "matched": "Class 332"
        },
        {
          "label": "Secondary Class Factor",
          "value": 1.98,
          "base": 1.98,
          "driver": "Secondary Class (per unit)",
          "input": "Account default",
          "matched": "Account default"
        },
        {
          "label": "Fleet Size Factor",
          "value": 0.97,
          "base": 1,
          "driver": "Number of rated power units",
          "input": "1 unit",
          "matched": "1-unit band, Heavy Trucks curve"
        },
        {
          "label": "Vehicle Age Factor",
          "value": 1.12,
          "base": 1,
          "driver": "Model Year (per unit)",
          "input": "3 yr old",
          "matched": "3 model years old"
        },
        {
          "label": "OCN Factor",
          "value": 1.14,
          "base": 1,
          "driver": "Vehicle stated value (per unit)",
          "input": "$500,000",
          "matched": "value band containing $500,000"
        },
        {
          "label": "Liability Radius Factor",
          "value": 0.95,
          "base": 1,
          "driver": "Radius of Operation",
          "input": "Intermediate",
          "matched": "Local-Intermediate · Local-200 (0 - 200 Miles)"
        },
        {
          "label": "NAICS Industry Factor",
          "value": 1.1,
          "base": 1,
          "driver": "Industry Classification (NAICS)",
          "input": "484110",
          "matched": "484110 — General Freight Trucking, Local"
        },
        {
          "label": "Tort Limitation Factor",
          "value": 1,
          "base": 1,
          "driver": "Garaging State",
          "input": "TX",
          "matched": "TX — standard tort"
        },
        {
          "label": "Vehicle Ownership Factor",
          "value": 0.95,
          "base": 1,
          "driver": "Vehicle ownership",
          "input": "Owned",
          "matched": "Owned"
        },
        {
          "label": "Pollution Factor",
          "value": 1.03,
          "base": 1,
          "driver": "Auto liability pollution grade",
          "input": "Low",
          "matched": "Low"
        },
        {
          "label": "Driver Criteria Factor",
          "value": 1,
          "base": 1,
          "driver": "Driver schedule vs filed criteria",
          "input": "All drivers meet criteria",
          "matched": "All drivers meet criteria"
        },
        {
          "label": "Loss Experience Factor",
          "value": 1,
          "base": 1,
          "driver": "Prior-term loss ratio",
          "input": "no prior experience",
          "matched": "No prior experience"
        },
        {
          "label": "Payment Plan Factor",
          "value": 1,
          "base": 1,
          "driver": "Bill type",
          "input": "Agency Bill",
          "matched": "Agency Bill"
        },
        {
          "label": "UW Credit / Debit",
          "value": 1,
          "base": 1,
          "driver": "Underwriter judgment",
          "input": "1",
          "matched": "clamped to 0.75–1.25"
        },
        {
          "label": "Heavy Farm Factor",
          "value": 1,
          "base": 1,
          "driver": "Vehicle use type",
          "input": "General Freight",
          "matched": "General Freight"
        },
        {
          "label": "Heavy Dumping Factor",
          "value": 1,
          "base": 1,
          "driver": "Vehicle use type",
          "input": "General Freight",
          "matched": "General Freight"
        },
        {
          "label": "Miles Driven Factor",
          "value": 1.03,
          "base": 1,
          "driver": "Annual Miles + Radius category",
          "input": "87,500 mi",
          "matched": "Local-Intermediate band"
        },
        {
          "label": "Rating Class Factor",
          "value": 1,
          "base": 1,
          "driver": "Cargo / Hauling Type",
          "input": "Dry Van or Box - Single Trailer",
          "matched": "Dry Van or Box - Single Trailer"
        },
        {
          "label": "Dashcam Factor",
          "value": 1.2,
          "base": 1,
          "driver": "Dashcams Installed",
          "input": "NO Dashcams",
          "matched": "NO Dashcams"
        },
        {
          "label": "CDL Experience Discount",
          "value": 1,
          "base": 1,
          "driver": "Driver CDL experience (per driver)",
          "input": "0 of 1 rated drivers have 3+ yrs",
          "matched": "0% qualified × 10% max discount"
        },
        {
          "label": "Driver Class Factor",
          "value": 0.95,
          "base": 1,
          "driver": "Driver age, violations & accidents",
          "input": "3 drivers, 2 with violations",
          "matched": "average of best 1 driver"
        },
        {
          "label": "Account-Level Factor",
          "value": 1.1,
          "base": 1,
          "driver": "8 underwriting questions",
          "input": "Business Experience +5%, Carrier Safety / FMCSA Alerts +10%, ICC Filing -5%",
          "matched": "1 + sum of credits/debits"
        },
        {
          "label": "Experience Mod",
          "value": 0.9,
          "base": 1,
          "driver": "Loss history (3yr claims & incurred)",
          "input": "0 claims > $500, $0 incurred",
          "matched": "credibility-weighted, 1 units × 36 mo"
        },
        {
          "label": "Rated Power Units",
          "value": 1,
          "base": null,
          "driver": "Vehicle Schedule",
          "input": "1 unit",
          "matched": "count of vehicles on the schedule"
        }
      ]
    },
    {
      "name": "Physical Damage",
      "subtotal": 19622,
      "factors": [
        {
          "label": "Total Insured Value (units + trailers)",
          "value": 500000,
          "base": null,
          "driver": "Vehicle & trailer stated values",
          "input": "1 unit",
          "matched": "sum of every unit's stated value plus its trailer"
        },
        {
          "label": "APD Rate (per $ of value)",
          "value": 0.0475,
          "base": 0.0475,
          "driver": "Vehicle stated value (per unit)",
          "input": "$500,000",
          "matched": "value band containing $500,000"
        },
        {
          "label": "APD Deductible Factor",
          "value": 0.875,
          "base": 1,
          "driver": "Physical Damage Deductible",
          "input": "$5,000",
          "matched": "$5,000 deductible"
        },
        {
          "label": "APD Radius Factor",
          "value": 0.95,
          "base": 1,
          "driver": "Radius of Operation",
          "input": "Intermediate",
          "matched": "Local-Intermediate · Local-200 (0 - 200 Miles)"
        },
        {
          "label": "Trailer PhysDam Factor",
          "value": 1,
          "base": 1,
          "driver": "Trailer Type (per unit)",
          "input": "None",
          "matched": "None"
        },
        {
          "label": "APD State Factor",
          "value": 0.95,
          "base": 1,
          "driver": "Garaging State",
          "input": "TX",
          "matched": "TX"
        },
        {
          "label": "APD Package Factor",
          "value": 0.9,
          "base": 1,
          "driver": "Coverages selected",
          "input": "Liability + Physical Damage",
          "matched": "Package policy — Yes"
        },
        {
          "label": "Miles Driven Factor",
          "value": 1.03,
          "base": 1,
          "driver": "Annual Miles + Radius category",
          "input": "87,500 mi",
          "matched": "Local-Intermediate band"
        },
        {
          "label": "Rating Class Factor",
          "value": 1,
          "base": 1,
          "driver": "Cargo / Hauling Type",
          "input": "Dry Van or Box - Single Trailer",
          "matched": "Dry Van or Box - Single Trailer"
        },
        {
          "label": "Dashcam Factor",
          "value": 1.2,
          "base": 1,
          "driver": "Dashcams Installed",
          "input": "NO Dashcams",
          "matched": "NO Dashcams"
        },
        {
          "label": "Experience Mod",
          "value": 0.9,
          "base": 1,
          "driver": "Loss history (3yr claims & incurred)",
          "input": "0 claims > $500, $0 incurred",
          "matched": "same mod as Auto Liability"
        }
      ]
    }
  ],
  "eligibility": {
    "declines": [],
    "refers": [
      "Fleet Size Minimum"
    ]
  },
  "adapter": {
    "fieldsMapped": 23,
    "warnings": []
  }
};

let isQuoteImported = false;
let currentImportedRatingData = null;

function toggleStep7View(mode) {
  if (mode === "summary") {
    isQuoteImported = false;
  } else {
    isQuoteImported = true;
    if (!currentImportedRatingData) {
      currentImportedRatingData = DEFAULT_IMPORTED_RATING_JSON;
    }
  }
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];
  renderStep7View(sub);
}

function triggerSystemJsonUpload() {
  const input = document.getElementById("quoteJsonSystemDirectInput");
  if (input) {
    input.value = "";
    input.click();
  }
}

function handleSystemJsonFileSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  readAndProcessJsonFile(file);
}

function handleJsonDragOver(event) {
  event.preventDefault();
  event.stopPropagation();
  const box = document.getElementById("jsonDropzoneBox");
  if (box) box.classList.add("dragover");
}

function handleJsonDragLeave(event) {
  event.preventDefault();
  event.stopPropagation();
  const box = document.getElementById("jsonDropzoneBox");
  if (box) box.classList.remove("dragover");
}

function handleJsonFileDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  const box = document.getElementById("jsonDropzoneBox");
  if (box) box.classList.remove("dragover");

  if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
    readAndProcessJsonFile(event.dataTransfer.files[0]);
  }
}

function recordQuoteVersion(sub, isBound = false) {
  if (!sub) sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];

  let subEntry = QUOTE_VERSIONS_DATASET.find(v => v.subId === sub.id);
  if (!subEntry) {
    subEntry = {
      subId: sub.id,
      insured: sub.insured,
      lob: sub.lobName || "Commercial Auto / Trucking",
      broker: sub.broker || "Marsh & McLennan Commercial Brokerage",
      quotes: []
    };
    QUOTE_VERSIONS_DATASET.push(subEntry);
  }

  const existingCount = subEntry.quotes.length;
  const majorVer = existingCount + 1;
  const verTag = `v${majorVer}.0`;
  const baseQuoteId = sub.quoteNo || sub.quote_id || `QT-2026-${sub.id.replace(/[^0-9]/g, '')}`;
  const rawId = baseQuoteId.split('-v')[0];
  const versionId = `${rawId}-${verTag}`;

  subEntry.quotes.forEach(q => {
    q.isLatest = false;
    if (q.status === "Official Bindable Quote" || q.status === "Active Quote") {
      q.status = "Previous Version (Revised)";
      q.statusBadge = "badge-secondary";
    }
  });

  const dp = ensureDiscretionaryPricingSeed(sub);
  const currentPrem = dp.finalPremium || (currentImportedRatingData && currentImportedRatingData.quote && currentImportedRatingData.quote.finalPremium) || getSubmissionPremium(sub);
  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;

  const newQuoteVersion = {
    versionId: versionId,
    versionTag: verTag,
    quoteNo: versionId,
    type: isBound ? "Bound & Policy Issued" : (isQuoteImported ? "Imported JSON Rating Engine Quote" : "Underwriter Issued Quote"),
    date: new Date().toISOString().slice(0, 16).replace("T", " "),
    author: `${roleConfig.name} (${roleConfig.title})`,
    baseCoveragePremium: Math.round(currentPrem * 0.85),
    appliedDiscounts: 0,
    feesAndTaxes: Math.round(currentPrem * 0.15),
    premium: currentPrem,
    finalPremium: currentPrem,
    liabilityLimit: sub.exposure ? `$${sub.exposure} CSL` : "$1,000,000 CSL",
    pdDeductible: "$2,500",
    status: isBound ? "Bound Policy Issued" : "Official Bindable Quote",
    statusBadge: isBound ? "badge-success" : "badge-primary",
    isBound: isBound,
    isLatest: true,
    notes: `Quote ${verTag} recorded with Final Quoted Premium: $${currentPrem.toLocaleString()}`,
    ratingPayload: currentImportedRatingData || getSubmissionRatingPayload(sub)
  };

  subEntry.quotes.push(newQuoteVersion);
  sub.quoteNo = versionId;
  sub.quote_id = versionId;

  const sideCount = document.getElementById("sidebarVersionsCount");
  if (sideCount) sideCount.textContent = getAllFlatQuotes().length;

  if (currentPage === "quote-versions") {
    renderQuoteVersionsLedger();
  }

  return newQuoteVersion;
}

function applyImportedRatingDataToSubmission(parsed, sub) {
  currentImportedRatingData = parsed;
  isQuoteImported = true;

  if (parsed && parsed.quote) {
    const rawPrem = parsed.quote.finalPremium !== undefined 
      ? parsed.quote.finalPremium 
      : (parsed.quote.totalPremium !== undefined ? parsed.quote.totalPremium : parsed.quote.annualPremium);

    if (rawPrem !== undefined && rawPrem !== null) {
      const numPrem = parseFloat(String(rawPrem).replace(/[^0-9.]/g, ""));
      if (!isNaN(numPrem) && numPrem > 0) {
        parsed.quote.finalPremium = numPrem;
        
        // Sync discretionary pricing so Final Quoted Premium, TOTAL BINDABLE POLICY PREMIUM, and Final Annual Total match
        sub.discretionaryPricing = {
          basePremium: numPrem,
          adjustmentType: null,
          adjustmentPercent: 0,
          reason: "Imported Rating Engine Output JSON",
          appliedBy: "System Rating Import",
          appliedAt: new Date().toISOString(),
          finalPremium: numPrem
        };
        sub.currentPremium = numPrem;
      }
    }
  }

  recordQuoteVersion(sub, false);
}

function readAndProcessJsonFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    try {
      const parsed = JSON.parse(text);
      if (!parsed.quote || !parsed.coverages) {
        throw new Error("Invalid structure: JSON must contain 'quote' and 'coverages' properties.");
      }

      const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];
      applyImportedRatingDataToSubmission(parsed, sub);

      // Update textarea and file indicator if modal is open
      const textarea = document.getElementById("importQuoteJsonTextarea");
      if (textarea) textarea.value = JSON.stringify(parsed, null, 2);

      const fileIndicator = document.getElementById("loadedFileIndicator");
      const fileNameSpan = document.getElementById("loadedFileName");
      const fileSizeSpan = document.getElementById("loadedFileSize");
      if (fileIndicator && fileNameSpan && fileSizeSpan) {
        fileNameSpan.textContent = file.name;
        fileSizeSpan.textContent = (file.size / 1024).toFixed(1) + " KB";
        fileIndicator.style.display = "flex";
      }

      // Render quote directly below summary
      renderStep7View(sub);
      closeImportQuoteJsonModal();

      setTimeout(() => {
        const quoteArea = document.getElementById("step7GeneratedQuoteArea");
        if (quoteArea) {
          quoteArea.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      showToast(`🎉 File "${file.name}" imported successfully! Final Quoted Premium: $${parsed.quote.finalPremium ? parsed.quote.finalPremium.toLocaleString() : '39,260'}`, "success");
    } catch (err) {
      alert("JSON File Parsing Error: " + err.message);
    }
  };
  reader.onerror = function() {
    showToast("Failed to read JSON file from system", "danger");
  };
  reader.readAsText(file);
}

function openImportQuoteJsonModal() {
  const modal = document.getElementById("importQuoteJsonModal");
  const textarea = document.getElementById("importQuoteJsonTextarea");
  if (!modal) return;

  if (textarea) {
    textarea.value = JSON.stringify(currentImportedRatingData || DEFAULT_IMPORTED_RATING_JSON, null, 2);
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeImportQuoteJsonModal() {
  const modal = document.getElementById("importQuoteJsonModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function loadSampleRatingJson() {
  const textarea = document.getElementById("importQuoteJsonTextarea");
  if (textarea) {
    textarea.value = JSON.stringify(DEFAULT_IMPORTED_RATING_JSON, null, 2);
    showToast("Loaded standard Commercial Trucking rating JSON sample", "info");
  }
}

function handleApplyImportedJson() {
  const textarea = document.getElementById("importQuoteJsonTextarea");
  if (!textarea) return;

  try {
    const parsed = JSON.parse(textarea.value);
    if (!parsed.quote || !parsed.coverages) {
      throw new Error("Invalid structure: JSON must contain 'quote' and 'coverages' objects.");
    }

    const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];
    applyImportedRatingDataToSubmission(parsed, sub);
    
    renderStep7View(sub);
    closeImportQuoteJsonModal();

    setTimeout(() => {
      const quoteArea = document.getElementById("step7GeneratedQuoteArea");
      if (quoteArea) {
        quoteArea.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    showToast(`⚡ Rating JSON successfully applied! Final Quoted Premium: $${parsed.quote.finalPremium ? parsed.quote.finalPremium.toLocaleString() : '39,260'}`, "success");
  } catch (err) {
    alert("JSON Parsing Error: " + err.message);
  }
}

function renderStep7View(sub) {
  const container = document.getElementById("step7MainContentContainer");
  if (!container) return;
  if (!sub) sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];

  // Discretionary Pricing (Base Premium, Credit/Debit, Taxes & Fees) is only
  // shown AFTER the rating engine JSON has been imported — there is no
  // rated base premium to apply a credit/debit against before that.
  const dpContainer = document.getElementById("discretionaryPricingContainer");
  if (dpContainer) {
    dpContainer.innerHTML = (isQuoteImported && currentImportedRatingData)
      ? renderDiscretionaryPricingCard(sub)
      : "";
  }

  const titleEl = document.getElementById("step7HeaderTitle");
  const descEl = document.getElementById("step7HeaderDesc");
  const pillEl = document.getElementById("step7PhasePill");

  if (!isQuoteImported || !currentImportedRatingData) {
    if (pillEl) pillEl.innerHTML = `<i class="ph ph-calculator"></i> Step 7 • Quote & Bind Studio`;
    if (titleEl) titleEl.textContent = "Commercial Trucking Formal Quote & Binding";
    if (descEl) descEl.textContent = "Import rating engine JSON output from your local system to generate and bind the commercial quote.";

    container.innerHTML = `
      <div class="import-rating-hub-card">
        <div class="import-hub-header">
          <div class="import-hub-header-left">
            <div class="import-hub-badge-icon">
              <i class="ph ph-cpu"></i>
            </div>
            <div>
              <h3>Actuarial Rating Engine Integration</h3>
              <p>Connect and parse external rating engine computation payload</p>
            </div>
          </div>
          <span class="badge badge-warning font-mono" style="font-size: 11px; padding: 5px 10px;">
            <i class="ph ph-circle-notch ph-spin"></i> Awaiting Payload
          </span>
        </div>

        <div class="import-hub-dropzone-body" id="step7JsonDropzone" onclick="triggerSystemJsonUpload()" ondragover="handleJsonDragOver(event)" ondragleave="handleJsonDragLeave(event)" ondrop="handleJsonFileDrop(event)" title="Click to browse .json file from your system">
          <div class="import-hub-icon-wrapper">
            <i class="ph ph-cloud-arrow-up"></i>
          </div>
          <div class="import-hub-title">Import Rating Engine Output JSON</div>
          <p class="import-hub-desc">
            Drag & drop the actuarial output <code>.json</code> file from your computer here, or click the button below to browse your local filesystem.
          </p>

          <div class="import-hub-btn-row">
            <button type="button" class="btn btn-warning btn-lg" onclick="event.stopPropagation(); triggerSystemJsonUpload();" style="font-weight: 800; padding: 12px 28px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border: none; color: #ffffff; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4); font-size: 14.5px; border-radius: 8px;">
              <i class="ph ph-folder-open"></i> Browse Rating JSON from System
            </button>
          </div>

          <div class="import-features-strip">
            <div class="import-feature-chip"><i class="ph ph-lightning text-warning"></i> Auto Liability & PhysDam Rates</div>
            <div class="import-feature-chip"><i class="ph ph-chart-pie text-primary"></i> 28 Actuarial Factor Dimensions</div>
            <div class="import-feature-chip"><i class="ph ph-tag text-success"></i> Discretionary Credits</div>
            <div class="import-feature-chip"><i class="ph ph-receipt text-danger"></i> Itemized Taxes & Fees</div>
            <div class="import-feature-chip"><i class="ph ph-shield-check text-info"></i> 14 Underwriting Rule Evaluations</div>
          </div>
        </div>

        <div class="import-hub-footer">
          <span><i class="ph ph-shield-check text-primary"></i> Schema: <strong>Trucking Rating Payload (v2026.03)</strong></span>
          <span><i class="ph ph-checks text-success"></i> Real-Time Quote Calculation Ready</span>
        </div>
      </div>
    `;
    return;
  }

  // Once JSON is imported, render the generated quote!
  if (pillEl) pillEl.innerHTML = `<i class="ph ph-check-circle text-success"></i> Step 7 • Quote Generated`;
  if (titleEl) titleEl.textContent = "Commercial Trucking Formal Quote & Binding";
  if (descEl) descEl.textContent = "Generated from imported rating engine output JSON. Actuarial factors decomposed, fees itemized, and terms bindable.";

  container.innerHTML = getGeneratedQuoteHtml(currentImportedRatingData, sub) + getPASSyncCardHtml(sub);
}

// ============================================================================
// QUOTE-BIND-ISSUE → PAS (POLICY ADMIN SYSTEM) INTEGRATION — simulated but
// functionally real: generates a policy number, records a PAS sync
// timestamp/record ID, and gates on RBAC + human decision, mirroring a real
// async system-to-system bind request rather than being purely decorative.
// ============================================================================
const PAS_LOB_PREFIX = {
  trucking: "CAT", property: "CPP", mpl: "PRO", gl_cpc: "GLC", gl_cas: "GLX", prd016: "MTR"
};

function generatePASPolicyNumber(sub) {
  const prefix = PAS_LOB_PREFIX[sub.lobKey] || "POL";
  const year = new Date().getFullYear();
  let hash = 0;
  const seed = sub.id + Date.now();
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const serial = String(hash % 900000 + 100000);
  return `${prefix}-${year}-${serial}`;
}

function getPASSyncCardHtml(sub) {
  if (sub.pasSync && sub.pasSync.status === "success") {
    const p = sub.pasSync;
    return `
      <div class="card mt-3" style="border-color:#a7f3d0;">
        <div class="card-header">
          <h3><i class="ph ph-check-circle" style="color:var(--color-success);"></i> Synced to Policy Admin System (PAS)</h3>
          <span class="badge badge-success">Sync Successful</span>
        </div>
        <div class="card-body">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); gap:12px; font-size:13px;">
            <div><span class="text-xs text-muted">Policy Number</span><br><strong class="font-mono">${p.policyNumber}</strong></div>
            <div><span class="text-xs text-muted">PAS Record ID</span><br><strong class="font-mono">${p.pasRecordId}</strong></div>
            <div><span class="text-xs text-muted">Effective Date</span><br><strong>${p.effectiveDate}</strong></div>
            <div><span class="text-xs text-muted">Synced By</span><br><strong>${p.syncedBy}</strong></div>
            <div><span class="text-xs text-muted">Synced At</span><br><strong>${p.syncedAt}</strong></div>
          </div>
        </div>
      </div>`;
  }

  return `
    <div class="card mt-3" id="pasSyncCard">
      <div class="card-header">
        <h3><i class="ph ph-arrows-clockwise"></i> Policy Admin System (PAS) Integration</h3>
        <span class="badge badge-warning">Not Yet Bound</span>
      </div>
      <div class="card-body">
        <p class="text-xs text-muted mb-2">Binding this quote submits a bind request to the downstream Policy Admin System, which returns a system-of-record policy number and confirms issuance.</p>
        <div id="pasSyncStatusArea"></div>
        <button class="btn btn-primary" id="pasSyncBindBtn" onclick="simulatePASBindSync('${sub.id}')">
          <i class="ph ph-arrows-clockwise"></i> Bind &amp; Sync to PAS
        </button>
      </div>
    </div>`;
}

function simulatePASBindSync(subId) {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId);
  if (!sub) return;

  if (!hasPermission("workflow", "approve")) {
    denyPermission("workflow", "approve");
    return;
  }

  const btn = document.getElementById("pasSyncBindBtn");
  const statusArea = document.getElementById("pasSyncStatusArea");
  if (btn) { btn.disabled = true; btn.innerHTML = `<i class="ph ph-circle-notch"></i> Submitting bind request to PAS...`; }
  if (statusArea) statusArea.innerHTML = `<div class="alert alert-info" style="font-size:12px;"><i class="ph ph-circle-notch"></i> Contacting Policy Admin System...</div>`;

  setTimeout(() => {
    if (btn) btn.innerHTML = `<i class="ph ph-circle-notch"></i> PAS validating bind request...`;

    setTimeout(() => {
      const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
      const policyNumber = generatePASPolicyNumber(sub);
      const pasRecordId = `PAS-REC-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();
      const effectiveDate = now.toISOString().slice(0, 10);
      const syncedAt = now.toISOString().slice(0, 16).replace("T", " ");

      sub.pasSync = {
        status: "success",
        policyNumber,
        pasRecordId,
        effectiveDate,
        syncedBy: `${roleConfig.name} (${roleConfig.title})`,
        syncedAt
      };

      if (!sub.decisionLog) sub.decisionLog = [];
      sub.decisionLog.push({
        step: 7,
        decision: "bound_and_synced",
        by: sub.pasSync.syncedBy,
        at: syncedAt,
        notes: `Bound and synced to PAS. Policy Number: ${policyNumber}, PAS Record ID: ${pasRecordId}.`
      });

      sub.statusText = "Policy Issued";
      sub.statusBadge = "badge-success";
      if (!sub.completedSteps) sub.completedSteps = [];
      if (!sub.completedSteps.includes(7)) sub.completedSteps.push(7);

      recordQuoteVersion(sub, true);

      const container = document.getElementById("step7MainContentContainer");
      if (container) {
        container.innerHTML = getGeneratedQuoteHtml(currentImportedRatingData, sub) + getPASSyncCardHtml(sub);
      }

      showToast(`✅ Bound and synced to PAS. Policy Number: ${policyNumber}`, "success");
      renderSubmissionsTable();
      refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
    }, 900);
  }, 900);
}

function getGeneratedQuoteHtml(data, sub) {
  const q = data.quote || {};
  const coverages = data.coverages || [];
  const fees = q.fees || [];
  const discounts = q.discounts || [];
  const notApplied = q.creditsNotApplied || [];
  const eligibility = data.eligibility || { declines: [], refers: [] };
  const adapter = data.adapter || { fieldsMapped: 23, warnings: [] };

  // Map the quote's final premium to the Underwriting Discretionary Pricing
  // (Post-Rating) outcome, so "TOTAL BINDABLE POLICY PREMIUM" and "Final
  // Annual Total" always match the Final Quoted Premium shown on that card.
  // Only applies when `sub` is a real tracked submission (this function is
  // also called from the Quote Version History preview with a different,
  // unrelated flat quote-record shape that has no discretionary pricing).
  const isTrackedSubmission = sub && sub.id && SUBMISSIONS_DATASET.some(s => s.id === sub.id);
  if (isTrackedSubmission) {
    const dp = ensureDiscretionaryPricingSeed(sub);
    q.finalPremium = dp.finalPremium;
  }

  const totalFeeAmt = fees.reduce((sum, f) => sum + (f.amt || 0), 0);
  const totalTaxAmt = (q.tax || 0) + (q.countyTax || 0);
  const discountAmt = discounts.reduce((sum, d) => sum + Math.abs(d.amt || 0), 0);

  return `
    <!-- Top Quote Generated Status Header -->
    <div class="quote-generated-badge-strip mb-3">
      <div style="display: flex; align-items: center; gap: 10px;">
        <i class="ph ph-check-circle text-success" style="font-size: 20px;"></i>
        <div>
          <span style="font-size: 13.5px; font-weight: 800; color: #166534;">Commercial Trucking Formal Bindable Quote</span>
          <div class="text-xs text-muted" style="margin: 0;">Generated from rating engine output JSON payload (${q.ratingVersion || 'v2026.03'})</div>
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-xs btn-warning" onclick="triggerSystemJsonUpload()" style="font-weight: 700;">
          <i class="ph ph-file-arrow-up"></i> Re-Import JSON
        </button>
      </div>
    </div>

    <!-- Top Executive Carrier Quote Sheet Card -->
    <div class="quote-hero-card">
      <div class="quote-hero-left">
        <div class="quote-hero-title-row">
          <i class="ph ph-shield-check text-warning" style="font-size: 24px;"></i>
          <div>
            <div style="font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 0.5px; text-transform: uppercase;">APEX MUTUAL INSURANCE GROUP • NAIC #40921</div>
            <h2>${q.lob || 'Commercial Trucking'} • Formal Bindable Quote</h2>
          </div>
          <span class="badge badge-primary font-mono">${q.ratingVersion || 'v2026.03'}</span>
          ${eligibility.refers && eligibility.refers.length > 0 ? `<span class="badge badge-warning font-bold"><i class="ph ph-warning"></i> Referral: ${eligibility.refers.join(', ')}</span>` : '<span class="badge badge-success"><i class="ph ph-shield-check"></i> Standard Clear</span>'}
        </div>
        <div class="quote-hero-meta mt-1">
          <span><i class="ph ph-building-office"></i> Insured: <strong>${sub.insured}</strong></span>
          <span><i class="ph ph-hash"></i> Quote #: <strong>${sub.quoteNo || 'QT-2026-89412'}</strong></span>
          <span><i class="ph ph-map-pin"></i> Garaging: <strong>${q.state || 'TX'} (${q.countyName || 'Denton County'})</strong></span>
          <span><i class="ph ph-handshake"></i> Producing Broker: <strong>${sub.broker}</strong></span>
          <span><i class="ph ph-calendar"></i> Term: <strong>12 Months</strong> (Valid 30 Days)</span>
        </div>
      </div>
      <div class="quote-hero-right">
        <div class="quote-hero-price-box">
          <div class="qhp-lbl">TOTAL BINDABLE POLICY PREMIUM</div>
          <div class="qhp-val">$${(q.finalPremium || 39260).toLocaleString()}</div>
        </div>
      </div>
    </div>

    <!-- 5-Metric Financial Decomposition Strip -->
    <div class="quote-kpi-summary-strip">
      <div class="qkpi-card">
        <span class="qkpi-lbl"><i class="ph ph-stack text-primary"></i> 1. Base Coverage Premium</span>
        <strong class="qkpi-val text-primary">$${(q.coveragePremium || 35062).toLocaleString()}</strong>
        <span class="qkpi-sub">Liability ($${((coverages[0] && coverages[0].subtotal) || 15440).toLocaleString()}) + PhysDam ($${((coverages[1] && coverages[1].subtotal) || 19622).toLocaleString()})</span>
      </div>
      <div class="qkpi-card">
        <span class="qkpi-lbl"><i class="ph ph-tag text-success"></i> 2. Applied Discounts</span>
        <strong class="qkpi-val text-success">-$${discountAmt.toLocaleString()}</strong>
        <span class="qkpi-sub">${discounts.map(d => d.name).join(', ') || '0 Applied'}</span>
      </div>
      <div class="qkpi-card">
        <span class="qkpi-lbl"><i class="ph ph-receipt text-warning"></i> 3. Statutory & Broker Fees</span>
        <strong class="qkpi-val text-warning">+$${totalFeeAmt.toLocaleString()}</strong>
        <span class="qkpi-sub">${fees.length} Mandatory Fees Schedule</span>
      </div>
      <div class="qkpi-card">
        <span class="qkpi-lbl"><i class="ph ph-bank text-danger"></i> 4. State & County Taxes</span>
        <strong class="qkpi-val text-danger">+$${totalTaxAmt.toLocaleString()}</strong>
        <span class="qkpi-sub">SL 4.85% ($${(q.tax||1590).toLocaleString()}) + Denton 0.55% ($${(q.countyTax||180).toLocaleString()})</span>
      </div>
      <div class="qkpi-card" style="background: #f0fdf4; border-color: #86efac;">
        <span class="qkpi-lbl text-success"><i class="ph ph-lock"></i> 5. Final Annual Total</span>
        <strong class="qkpi-val text-success font-bold" style="font-size: 20px;">$${(q.finalPremium || 39260).toLocaleString()}</strong>
        <span class="qkpi-sub text-success font-bold">12-Month Bind Terms</span>
      </div>
    </div>

    <!-- Main Split Grid (Coverage Decomposition & Factors VS Fees & Rules) -->
    <div class="quote-split-grid">
      
      <!-- LEFT COLUMN: COVERAGES & RATING FACTOR DECOMPOSITION -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${coverages.map((cov, idx) => `
          <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge badge-primary font-bold" style="font-size: 12px;">Coverage Line ${idx + 1}</span>
                <h3 style="margin: 0; font-size: 14px;"><strong>${cov.name} Coverage</strong></h3>
              </div>
              <strong class="font-mono text-primary" style="font-size: 15px;">Subtotal: $${(cov.subtotal || 0).toLocaleString()}</strong>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive" style="max-height: 380px; overflow-y: auto;">
                <table class="quote-factors-table">
                  <thead>
                    <tr>
                      <th style="width: 32%;">Rating Factor Dimension</th>
                      <th style="width: 14%;">Multiplier</th>
                      <th style="width: 24%;">Input Driver</th>
                      <th style="width: 30%;">Actuarial Matched Rule</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(cov.factors || []).map(f => `
                      <tr>
                        <td><strong>${f.label}</strong></td>
                        <td class="font-mono font-bold ${f.value > 1.05 ? 'text-danger' : (f.value < 0.98 ? 'text-success' : 'text-primary')}">
                          ${typeof f.value === 'number' ? (f.value >= 100 ? f.value.toLocaleString() : f.value) : f.value}
                        </td>
                        <td class="text-xs text-muted font-mono">${f.input || '—'}</td>
                        <td class="text-xs" style="color: #475569;">${f.matched || '—'}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- RIGHT COLUMN: ITEMISED FEES, DISCOUNTS & EVALUATED RULES -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        
        <!-- Applied Discounts Card -->
        <div class="card">
          <div class="card-header" style="background: #f0fdf4; border-bottom-color: #bbf7d0;">
            <h3 style="margin: 0; font-size: 13.5px; color: #166534;"><i class="ph ph-tag text-success"></i> Applied Credits & Deductions</h3>
          </div>
          <div class="card-body p-0">
            <table class="quote-fees-table">
              <thead>
                <tr>
                  <th>Discount Name</th>
                  <th>Value</th>
                  <th>Savings Amount</th>
                  <th>Underwriting Reason</th>
                </tr>
              </thead>
              <tbody>
                ${discounts.length > 0 ? discounts.map(d => `
                  <tr>
                    <td><strong>${d.name}</strong></td>
                    <td class="font-mono font-bold text-success">${(d.value * 100).toFixed(0)}%</td>
                    <td class="font-mono font-bold text-success">-$${Math.abs(d.amt).toLocaleString()}</td>
                    <td class="text-xs text-muted">${d.why}</td>
                  </tr>
                `).join('') : '<tr><td colspan="4" class="text-center py-2 text-muted">No discretionary discounts applied</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Statutory & Broker Fee Schedule Card -->
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 13.5px;"><i class="ph ph-receipt text-warning"></i> Itemized Mandatory Fee Schedule</h3>
            <span class="badge badge-warning font-bold">Total: $${totalFeeAmt.toLocaleString()}</span>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive" style="max-height: 260px; overflow-y: auto;">
              <table class="quote-fees-table">
                <thead>
                  <tr>
                    <th>Fee Name</th>
                    <th>Type / Basis</th>
                    <th>Charge Basis</th>
                    <th style="text-align: right;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${fees.map(f => `
                    <tr>
                      <td>
                        <strong>${f.name}</strong>
                        <div class="text-xs text-muted font-mono">${f.code}</div>
                      </td>
                      <td class="text-xs">${f.valueType === 'Percent' ? f.pct + '% of ' + f.percentOf : '$' + f.unit + ' Flat'}</td>
                      <td><span class="badge badge-light text-xs">${f.chargeType}</span></td>
                      <td class="font-mono font-bold" style="text-align: right;">$${f.amt.toLocaleString()}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Underwriting Eligibility & Credits Evaluated Log -->
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 13.5px;"><i class="ph ph-list-checks text-info"></i> Credits & Surcharges Evaluated (${notApplied.length})</h3>
            <span class="badge badge-info font-mono">${adapter.fieldsMapped || 23} Fields Mapped</span>
          </div>
          <div class="card-body">
            <div class="rules-evaluated-list">
              ${notApplied.map(r => {
                let badgeClass = "badge-secondary";
                if (r.undetermined) badgeClass = "badge-warning";
                else if (r.reason.includes("priced")) badgeClass = "badge-info";

                return `
                  <div class="rule-eval-item">
                    <div>
                      <div class="r-name">${r.name} <span class="text-xs font-mono text-muted">(${r.code})</span></div>
                      <div class="r-reason">${r.reason}</div>
                    </div>
                    <span class="badge ${badgeClass}" style="font-size: 10px; white-space: nowrap;">
                      ${r.undetermined ? 'Undetermined' : (r.reason.includes("priced") ? 'Priced in Chain' : 'Condition Not Met')}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Mandatory Subjectivities & Bind Conditions Box -->
        <div class="card">
          <div class="card-header" style="background: #fffbeb; border-bottom-color: #fef3c7;">
            <h3 style="margin: 0; font-size: 13.5px; color: #92400e;"><i class="ph ph-clipboard-text text-warning"></i> Mandatory Bind Subjectivities</h3>
          </div>
          <div class="card-body py-2 px-3" style="font-size: 11.5px; color: #78350f;">
            <ul style="margin: 0; padding-left: 18px; line-height: 1.5;">
              <li>Receipt & satisfactory review of Motor Vehicle Records (MVRs) for all 4 drivers within 15 days of bind.</li>
              <li>Signed and dated ACORD 125 & ACORD 137 applications on file.</li>
              <li>Satisfactory verification of down payment installment ($3,926.00).</li>
            </ul>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Quote Issuance & Delivery Action Panel -->
    <div class="card mt-3" style="border: 1px solid #cbd5e1; box-shadow: var(--shadow-md);">
      <div class="card-header" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="ph ph-paper-plane-tilt text-warning" style="font-size: 18px;"></i>
          <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #ffffff;">Issue Commercial Trucking Formal Quote</h3>
        </div>
        <span class="badge badge-success font-mono" id="quoteIssuanceStatusBadge">30-Day Bind Window Active</span>
      </div>
      <div class="card-body p-4">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <div>
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 800; color: #0f172a;">Select Quote Delivery Target:</h4>
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; font-weight: 600; color: #334155;">
                <input type="radio" name="policyRecipientTarget" value="broker" checked onchange="updateIssuanceRecipientUI()">
                <span>Producing Broker Agency (${(sub.broker || 'Marsh').split(' ')[0]})</span>
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; font-weight: 600; color: #334155;">
                <input type="radio" name="policyRecipientTarget" value="customer" onchange="updateIssuanceRecipientUI()">
                <span>Direct Insured Customer (${sub.insured})</span>
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; font-weight: 600; color: #334155;">
                <input type="radio" name="policyRecipientTarget" value="both" onchange="updateIssuanceRecipientUI()">
                <span>Simultaneous Dual Dispatch (Both)</span>
              </label>
            </div>
          </div>
          <div>
            <button type="button" class="btn btn-success btn-lg" id="btnIssueQuote" onclick="issueQuoteAction()" style="font-weight: 800; padding: 12px 28px; font-size: 15px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35); background: #16a34a; border-color: #15803d; color: #ffffff;">
              <i class="ph ph-paper-plane-tilt"></i> Issue Quote
            </button>
          </div>
        </div>

        <!-- Dynamic Success Banner when Issued -->
        <div id="issuedQuoteSuccessBanner" style="display: none; margin-top: 18px; padding: 16px 20px; background: #f0fdf4; border: 1px solid #86efac; border-radius: var(--radius-md); align-items: center; gap: 14px;">
          <div style="width: 42px; height: 42px; border-radius: 50%; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;">
            <i class="ph ph-check-circle"></i>
          </div>
          <div>
            <h4 style="margin: 0; font-size: 14.5px; font-weight: 800; color: #166534;">Commercial Trucking Quote Issued Successfully!</h4>
            <p style="margin: 3px 0 0 0; font-size: 12.5px; color: #15803d;" id="issuedQuoteRecipientDetails">
              Quote documentation & bind terms have been dispatched to the selected recipient inbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 7. ACTIONS & USER INTERACTIONS
// ============================================================================
function setExposureScenario(scenario) {
  exposureScenario = scenario;
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (sub) {
    renderAuthorityScreen(sub);
    if (scenario === "exceeds") {
      showToast("Simulated Exposure: Exceeds Primary Underwriter Limit (Senior Referral Triggered)", "warning");
    } else {
      showToast("Simulated Exposure: Within Primary Authority", "success");
    }
  }
}

function triggerDuplicateExit() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (sub) {
    const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
    const nowStamp = new Date().toISOString().slice(0, 16).replace("T", " ");

    sub.lifecycleStatus = "declined";
    sub.lifecycleStatusAt = Date.now();
    sub.declinedBy = `${roleConfig.name} (${roleConfig.title})`;
    sub.declineReason = "Conflicting submission already locked by another broker of record (Duplicate FEIN).";
    sub.declineTriggerPoint = "Duplicate FEIN";
    // Duplicate FEIN declines are routed directly to Senior Underwriter
    // review — a junior-level FEIN mismatch isn't auto-resolved, it needs
    // senior sign-off before a corrected FEIN can be assigned.
    sub.statusText = "Senior Referral";
    sub.statusBadge = "badge-warning";
    sub.isReferral = true;

    if (!sub.decisionLog) sub.decisionLog = [];
    sub.decisionLog.push({
      step: sub.currentStep || 2,
      decision: "declined",
      by: sub.declinedBy,
      at: nowStamp,
      notes: "Declined (Duplicate FEIN): Conflicting submission already locked by another broker of record. Referred directly to Senior Underwriter for resolution."
    });

    DECLINE_LOG.unshift({
      subId: sub.id,
      insured: sub.insured,
      lob: sub.lobName,
      triggerPoint: "Duplicate FEIN",
      reason: "Conflicting submission already locked by another broker of record.",
      at: nowStamp
    });

    renderSubmissionsTable();
    refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
  }

  showDeclinePage();
  renderDeclineCenter();
  showToast("FEIN Conflict Detected! Submission declined and referred directly to Senior Underwriter for resolution.", "danger");
}

function triggerAppetiteFailureExit() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (sub) {
    const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
    const nowStamp = new Date().toISOString().slice(0, 16).replace("T", " ");

    sub.lifecycleStatus = "declined";
    sub.lifecycleStatusAt = Date.now();
    sub.declinedBy = `${roleConfig.name} (${roleConfig.title})`;
    sub.declineReason = "Risk criteria fall outside carrier underwriting appetite guidelines.";
    sub.declineTriggerPoint = "Appetite Knockout";
    sub.statusText = "Declined";
    sub.statusBadge = "badge-danger";

    if (!sub.decisionLog) sub.decisionLog = [];
    sub.decisionLog.push({
      step: sub.currentStep || 2,
      decision: "declined",
      by: sub.declinedBy,
      at: nowStamp,
      notes: "Declined (Appetite Knockout): Risk criteria fall outside carrier underwriting appetite guidelines."
    });

    DECLINE_LOG.unshift({
      subId: sub.id,
      insured: sub.insured,
      lob: sub.lobName,
      triggerPoint: "Appetite Knockout",
      reason: "Risk criteria fall outside carrier underwriting appetite guidelines.",
      at: nowStamp
    });

    renderSubmissionsTable();
    refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
  }

  showDeclinePage();
  renderDeclineCenter();
  showToast("Appetite Knockout Triggered! Auto-Decline notice logged in the Decline Center.", "danger");
}

function seniorUWAction(action) {
  const stamp = document.getElementById("signoffStamp");
  const badge = document.getElementById("referralStatusBadge");
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);

  if (action === "approve") {
    if (stamp) {
      stamp.style.display = "block";
      stamp.className = "signoff-stamp mt-3";
      stamp.style.background = "#f0fdf4";
      stamp.style.borderColor = "#10b981";
      stamp.style.color = "#065f46";
      stamp.innerHTML = `<i class="ph ph-stamp"></i> <strong>OFFICIALLY SIGNED OFF BY CUO:</strong> Cleared for Pricing by Marcus Vance (Chief Underwriting Officer) • Authority Delegated to Phase 4`;
    }
    if (badge) {
      badge.className = "badge badge-success";
      badge.textContent = "CUO Sign-Off Complete (Cleared for Pricing)";
    }
    if (sub) {
      sub.statusText = "Ready for Rating";
      sub.statusBadge = "badge-success";
      sub.isReferral = false;
    }
    renderSubmissionsTable();
    refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
    showToast("✍️ Marcus Vance (CUO) granted executive sign-off! Cleared for Pricing (Phase 4).", "success");
  } else if (action === "revise") {
    if (stamp) {
      stamp.style.display = "block";
      stamp.className = "signoff-stamp mt-3";
      stamp.style.background = "#fffbeb";
      stamp.style.borderColor = "#fde68a";
      stamp.style.color = "#92400e";
      stamp.innerHTML = `<i class="ph ph-arrow-counter-clockwise"></i> <strong>REVISION REQUESTED:</strong> Returned to Sarah Jenkins for additional loss warranty validation.`;
    }
    if (badge) {
      badge.className = "badge badge-warning";
      badge.textContent = "Returned for Revision";
    }
    showToast("🔄 Returned to Junior Underwriter (Sarah Jenkins) for revision.", "warning");
  } else {
    if (stamp) {
      stamp.style.display = "block";
      stamp.className = "signoff-stamp mt-3";
      stamp.style.background = "#fef2f2";
      stamp.style.borderColor = "#fecaca";
      stamp.style.color = "#991b1b";
      stamp.innerHTML = `<i class="ph ph-prohibit"></i> <strong>DECLINED BY SENIOR CUO:</strong> Risk exceeds hazard tolerance`;
    }
    goToScreen("screen-9");
    showToast("🚫 Risk declined by Senior Underwriter (Marcus Vance)! Archived in Exit Paths.", "danger");
  }
}

// RFI Modal Handlers
function openRFIModal() {
  const modal = document.getElementById("rfiModal");
  if (modal) modal.classList.add("active");
}

function closeRFIModal() {
  const modal = document.getElementById("rfiModal");
  if (modal) modal.classList.remove("active");
}

function sendRFIAction() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  const recipient = (document.getElementById("rfiRecipientEmail") || {}).value || "";
  const subject = (document.getElementById("rfiSubject") || {}).value || "";
  const message = ((document.getElementById("rfiMessageText") || {}).value || "").replace(/\s+/g, " ").trim();

  if (sub) {
    const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
    if (!sub.decisionLog) sub.decisionLog = [];
    sub.decisionLog.push({
      step: sub.currentStep || 4,
      decision: "rfi_sent",
      by: `${roleConfig.name} (${roleConfig.title})`,
      at: new Date().toISOString().slice(0, 16).replace("T", " "),
      notes: `Sent to ${recipient || "submitter"}. Subject: "${subject}". ${message}`
    });
    refreshAuditLogIfVisible();
  }

  closeRFIModal();
  showToast("RFI Dispatched to Submitter Portal! File status set to 'Pending Information'", "warning");
}

function addNewSubjectivity() {
  const text = prompt("Enter new subjectivity or binding condition:", "Subject to receipt of signed statement of no known losses.");
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId);
  if (text && sub) {
    sub.subjectivities.push(text);
    renderSubjectivities(sub.subjectivities);

    const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
    if (!sub.decisionLog) sub.decisionLog = [];
    sub.decisionLog.push({
      step: sub.currentStep || 7,
      decision: "subjectivity_added",
      by: `${roleConfig.name} (${roleConfig.title})`,
      at: new Date().toISOString().slice(0, 16).replace("T", " "),
      notes: text
    });
    refreshAuditLogIfVisible();

    showToast("Added new subjectivity condition", "success");
  }
}

// Bind Actions & Policy Issuance
function updateIssuanceRecipientUI() {
  const radioBroker = document.getElementById("radioTargetBroker");
  const radioCust = document.getElementById("radioTargetCustomer");
  const radioBoth = document.getElementById("radioTargetBoth");

  const boxBroker = document.getElementById("targetBrokerBox");
  const boxCust = document.getElementById("targetCustomerBox");
  const boxBoth = document.getElementById("targetBothBox");

  if (boxBroker) boxBroker.classList.toggle("selected", radioBroker && radioBroker.checked);
  if (boxCust) boxCust.classList.toggle("selected", radioCust && radioCust.checked);
  if (boxBoth) boxBoth.classList.toggle("selected", radioBoth && radioBoth.checked);
}

function issueQuoteAction() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === activeSubmissionId) || SUBMISSIONS_DATASET[0];
  const btn = document.getElementById("btnIssueQuote") || document.getElementById("btnBindPolicy");
  const banner = document.getElementById("issuedQuoteSuccessBanner") || document.getElementById("boundPolicyBanner");
  const details = document.getElementById("issuedQuoteRecipientDetails");
  const statusBadge = document.getElementById("quoteIssuanceStatusBadge") || document.getElementById("bindStateBadge");

  // Determine selected delivery recipient
  const radioTarget = document.querySelector('input[name="policyRecipientTarget"]:checked');
  const targetVal = radioTarget ? radioTarget.value : "broker";

  let recipientText = "";
  if (targetVal === "broker") {
    recipientText = `Dispatched to Producing Broker Agency (${(sub.broker || 'Marsh').split(' ')[0]}) inbox at broker-quote@${(sub.broker || 'marsh').toLowerCase().replace(/[^a-z]/g, '').substring(0, 8)}.com`;
  } else if (targetVal === "customer") {
    recipientText = `Dispatched directly to Insured Customer (${sub.insured}) portal at policy-ops@${sub.insured.toLowerCase().replace(/[^a-z]/g, '').substring(0, 8)}.com`;
  } else {
    recipientText = `Simultaneous Dual Dispatch: Sent to ${(sub.broker || 'Marsh').split(' ')[0]} Broker Inbox & ${sub.insured} Customer Portal`;
  }

  if (details) details.textContent = recipientText;

  if (statusBadge) {
    statusBadge.className = "badge badge-success";
    statusBadge.innerHTML = '<i class="ph ph-check-circle"></i> Quote Officially Issued & Active';
  }

  if (btn) {
    btn.innerHTML = '<i class="ph ph-check-circle"></i> QUOTE OFFICIALLY ISSUED';
    btn.disabled = true;
    btn.classList.add("disabled");
  }

  if (banner) {
    banner.style.display = "flex";
    try {
      banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (e) {}
  }

  if (sub) {
    sub.statusText = "Quote Issued";
    sub.statusBadge = "badge-success";
    if (!sub.completedSteps.includes(7)) sub.completedSteps.push(7);

    const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
    if (!sub.decisionLog) sub.decisionLog = [];
    sub.decisionLog.push({
      step: 7,
      decision: "quote_issued",
      by: `${roleConfig.name} (${roleConfig.title})`,
      at: new Date().toISOString().slice(0, 16).replace("T", " "),
      notes: recipientText
    });

    recordQuoteVersion(sub, false);
  }

  // Automatic download of active/imported JSON payload on Issue Quote action
  try {
    const jsonPayload = currentImportedRatingData || getSubmissionRatingPayload(sub);
    const jsonString = JSON.stringify(jsonPayload, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    
    const safeInsuredName = (sub.insured || "Quote").replace(/[^a-zA-Z0-9]/g, "_");
    downloadAnchor.href = url;
    downloadAnchor.download = `${sub.id || 'SUB-48213-TX'}_${safeInsuredName}_OfficialQuote_Payload.json`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    
    setTimeout(() => {
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(url);
    }, 150);

    showToast(`📥 Official JSON Quote Payload downloaded: ${downloadAnchor.download}`, "success");
  } catch (err) {
    console.error("Failed to auto-download quote JSON:", err);
  }

  updateActiveCaseHeaders(sub);
  renderSubmissionsTable();
  refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
  showToast(`🚀 Commercial Quote Issued Successfully to ${targetVal === 'broker' ? 'Producing Broker' : (targetVal === 'customer' ? 'Direct Insured' : 'Broker & Customer')}!`, "success");
}

function bindPolicyAction() {
  issueQuoteAction();
}

function requestBrokerRevision() {
  showToast("Revision request logged. File returned to Rating Studio for recalculation", "info");
  goToScreen("screen-7");
}

function expireQuoteAction() {
  showToast("Quote validity window expired (30-day term ended). File closed.", "warning");
  goToScreen("screen-9");
}

function printQuote() {
  window.print();
}

// ============================================================================
// SUBMISSION QUOTE VERSION HISTORY ENGINE (Page 4)
// ============================================================================

let activeVersionStatusFilter = "all";
let activeVersionSubFilter = "all";

const QUOTE_VERSIONS_DATASET = [
  {
    subId: "SUB-48213-TX",
    insured: "Apex Freight LLC",
    lob: "Commercial Auto / Trucking",
    broker: "Marsh & McLennan Commercial Brokerage",
    quotes: [
      {
        versionId: "QT-2026-89412-v1.0",
        versionTag: "v1.0",
        quoteNo: "QT-2026-89412-v1.0",
        type: "Initial Actuarial Rating Payload",
        date: "2026-08-23 10:15",
        author: "Rating Engine (v2026.03)",
        baseCoveragePremium: 35062,
        appliedDiscounts: -2805,
        feesAndTaxes: 7003,
        premium: 39260,
        liabilityLimit: "$1,000,000 CSL",
        pdDeductible: "$5,000",
        status: "Previous Version (Revised)",
        statusBadge: "badge-secondary",
        isBound: false,
        isLatest: false,
        notes: "Baseline actuarial output (v2026.03) with 28 rating factor dimensions and -8% claims-free credit.",
        ratingPayload: DEFAULT_IMPORTED_RATING_JSON
      },
      {
        versionId: "QT-2026-89412-v1.1",
        versionTag: "v1.1",
        quoteNo: "QT-2026-89412-v1.1",
        type: "UW Factor Re-calibration",
        date: "2026-08-24 14:20",
        author: "Sarah Jenkins (Senior Underwriter)",
        baseCoveragePremium: 34200,
        appliedDiscounts: -2736,
        feesAndTaxes: 6845,
        premium: 38309,
        liabilityLimit: "$1,000,000 CSL",
        pdDeductible: "$5,000",
        status: "Previous Version (Revised)",
        statusBadge: "badge-secondary",
        isBound: false,
        isLatest: false,
        notes: "Underwriter judgment modifier calibrated to 0.95 reflecting 3-year verified clean telematics warranty.",
        ratingPayload: {
          ...DEFAULT_IMPORTED_RATING_JSON,
          quote: {
            ...DEFAULT_IMPORTED_RATING_JSON.quote,
            coveragePremium: 34200,
            discounts: [{ name: "Claims-Free Credit", value: -0.08, amt: -2736, why: "No claims in prior 3 years" }],
            finalPremium: 38309
          }
        }
      },
      {
        versionId: "QT-2026-89412-v2.0",
        versionTag: "v2.0",
        quoteNo: "QT-2026-89412",
        type: "Official Bound Policy Terms",
        date: "2026-08-25 16:30",
        author: "Marcus Vance (CUO) & Elena Rostova",
        baseCoveragePremium: 35062,
        appliedDiscounts: -2805,
        feesAndTaxes: 7003,
        premium: 39260,
        liabilityLimit: "$1,000,000 CSL",
        pdDeductible: "$5,000",
        status: "Bound & Active (Latest)",
        statusBadge: "badge-success",
        isBound: true,
        isLatest: true,
        notes: "Executive CUO referral approved. Official formal bindable quote accepted & policy terms issued.",
        ratingPayload: DEFAULT_IMPORTED_RATING_JSON
      }
    ]
  },
  {
    subId: "SUB-45537",
    insured: "Test DR Sanjiv",
    lob: "Commercial Auto / Trucking",
    broker: "Aon Risk Solutions",
    quotes: [
      {
        versionId: "QT-1071611-v1.0",
        versionTag: "v1.0",
        quoteNo: "QT-1071611-v1.0",
        type: "Initial Actuarial Rating",
        date: "2026-08-26 11:10",
        author: "Rating Engine API",
        baseCoveragePremium: 35062,
        appliedDiscounts: -2805,
        feesAndTaxes: 7003,
        premium: 39260,
        liabilityLimit: "$1,000,000 CSL",
        pdDeductible: "$5,000",
        status: "Previous Version",
        statusBadge: "badge-secondary",
        isBound: false,
        isLatest: false,
        notes: "Initial ISO rating composite across 4 rated drivers and 1 scheduled power unit.",
        ratingPayload: DEFAULT_IMPORTED_RATING_JSON
      },
      {
        versionId: "QT-1071611-v2.0",
        versionTag: "v2.0",
        quoteNo: "QT-1071611",
        type: "Live Production Quote",
        date: "2026-08-27 10:00",
        author: "Elena Rostova (Binding Lead)",
        baseCoveragePremium: 35062,
        appliedDiscounts: -2805,
        feesAndTaxes: 7003,
        premium: 39260,
        liabilityLimit: "$1,000,000 CSL",
        pdDeductible: "$5,000",
        status: "Latest Active Quote",
        statusBadge: "badge-primary",
        isBound: false,
        isLatest: true,
        notes: "Current active production rating payload. Cleared for customer acceptance and formal policy binding.",
        ratingPayload: DEFAULT_IMPORTED_RATING_JSON
      }
    ]
  },
  {
    subId: "SUB-49002-IL",
    insured: "Midwest Bulk Haulers LLC",
    lob: "Commercial Auto / Trucking",
    broker: "Gallagher Commercial Brokerage",
    quotes: [
      {
        versionId: "QT-2026-91044-v1.0",
        versionTag: "v1.0",
        quoteNo: "QT-2026-91044",
        type: "Actuarial Model (v2026.03)",
        date: "2026-08-24 16:00",
        author: "Actuarial Engine",
        baseCoveragePremium: 42500,
        appliedDiscounts: -3400,
        feesAndTaxes: 8120,
        premium: 47220,
        liabilityLimit: "$1,000,000 CSL",
        pdDeductible: "$5,000",
        status: "Latest Active Quote",
        statusBadge: "badge-primary",
        isBound: false,
        isLatest: true,
        notes: "Multi-state bulk fleet composite rating with telematics schedule credit.",
        ratingPayload: DEFAULT_IMPORTED_RATING_JSON
      }
    ]
  }
];

function getAllFlatQuotes() {
  const list = [];
  QUOTE_VERSIONS_DATASET.forEach(sub => {
    sub.quotes.forEach(q => {
      list.push({ ...q, subId: sub.subId, insured: sub.insured, lob: sub.lob, broker: sub.broker });
    });
  });
  return list;
}

// ============================================================================
// SUBMISSION INTAKE — CUSTOMER DATA VERSIONING (independent of Quote Versioning)
// ============================================================================
// Tracks versions of the submission's customer-provided data itself (e.g.
// insured details, address, exposure, broker info). Each time customer-
// provided data changes, a new submission version is recorded here. This is
// entirely separate from quote/rating versions and never navigates to the
// Quote Versioning page — submissions stay within the Intake workflow.

const SUBMISSION_EDITABLE_FIELDS = [
  { key: "insured", label: "Named Insured" },
  { key: "fein", label: "FEIN" },
  { key: "address", label: "Mailing / Garaging Address" },
  { key: "broker", label: "Broker / Channel Name" },
  { key: "email", label: "Contact Email" },
  { key: "exposureVal", label: "Exposure Value", isNumber: true }
];

function ensureSubmissionVersionSeed(sub) {
  if (!sub.submissionVersions) {
    sub.submissionVersions = [{
      version: 1,
      at: sub.receivedAt || "—",
      by: "System Intake",
      changes: [{ field: "Submission Created", oldVal: null, newVal: "Initial customer-provided data captured at intake" }],
      threadRef: 0
    }];
  }
  return sub.submissionVersions;
}

// ----------------------------------------------------------------------------
// Customer Communication Thread — the to-and-fro exchange that produces each
// submission version. Messages always travel through the SAME channel the
// submission originally arrived on (Broker or Direct), never a new channel.
// ----------------------------------------------------------------------------
const UPDATE_TYPE_LABELS = {
  additional: "Additional Info Provided",
  missing: "Missing Info Supplied",
  changed: "Changed Info / Correction"
};

function getChannelPartyLabel(sub) {
  return sub.channelType === "broker"
    ? (sub.broker || "Broker")
    : "Customer (Direct Portal)";
}

function ensureCommunicationThreadSeed(sub) {
  if (!sub.communicationThread) {
    const party = getChannelPartyLabel(sub);
    sub.communicationThread = [{
      direction: "inbound",
      via: sub.channelType === "broker" ? `Broker Email (${sub.broker || "Broker"})` : "Direct Customer Portal",
      from: party,
      to: "Underwriting Team",
      at: sub.receivedAt || "—",
      updateType: null,
      message: `Original submission received via ${sub.channelType === "broker" ? "broker intake" : "direct customer portal"}.`
    }];
  }
  return sub.communicationThread;
}

function renderCommunicationThreadHtml(sub) {
  const thread = ensureCommunicationThreadSeed(sub);
  return thread.map(m => `
    <div style="display:flex; ${m.direction === 'inbound' ? 'justify-content:flex-start;' : 'justify-content:flex-end;'} margin-bottom:8px;">
      <div style="max-width:80%; background:${m.direction === 'inbound' ? 'var(--color-surface)' : 'var(--color-brand-light)'}; border:1px solid var(--color-border); border-radius:8px; padding:10px 12px;">
        <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:4px;">
          <strong style="font-size:12px;">${m.direction === 'inbound' ? `${m.from} → ${m.to}` : `${m.to} → ${m.from}`}</strong>
          <span class="text-xs text-muted">${m.at}</span>
        </div>
        <div class="text-xs text-muted" style="margin-bottom:4px;"><i class="ph ${sub.channelType === 'broker' ? 'ph-briefcase' : 'ph-user'}"></i> via ${m.via}${m.updateType ? ` • <span class="badge badge-info" style="font-size:10px;">${UPDATE_TYPE_LABELS[m.updateType] || m.updateType}</span>` : ''}</div>
        <div style="font-size:13px;">${m.message}</div>
      </div>
    </div>`).join("");
}

function getSubmissionDataVersionCount(sub) {
  return ensureSubmissionVersionSeed(sub).length;
}

// ----------------------------------------------------------------------------
// Missing Documents & Missing Data tracking (part of submission versioning)
// ----------------------------------------------------------------------------
function ensureMissingItemsSeed(sub) {
  if (!sub.missingItems) {
    // Default: nothing flagged missing unless explicitly seeded on the record.
    sub.missingItems = { documents: [], dataFields: [] };
  }
  return sub.missingItems;
}

function getOutstandingMissingCount(sub) {
  const m = ensureMissingItemsSeed(sub);
  return m.documents.length + m.dataFields.length;
}

function renderMissingItemsSummaryHtml(sub) {
  const m = ensureMissingItemsSeed(sub);
  if (m.documents.length === 0 && m.dataFields.length === 0) {
    return `<div class="alert alert-success" style="font-size:12.5px;"><i class="ph ph-check"></i> No missing documents or data outstanding for this submission.</div>`;
  }
  const docItems = m.documents.map(d => `<li>${d}</li>`).join("");
  const dataItems = m.dataFields.map(d => `<li>${d}</li>`).join("");
  return `
    <div class="alert alert-warning" style="font-size:12.5px;">
      <i class="ph ph-warning"></i> <strong>Outstanding items for this submission:</strong>
      ${m.documents.length ? `<div style="margin-top:6px;"><strong>Missing Documents (${m.documents.length}):</strong><ul style="margin:4px 0 0 18px;">${docItems}</ul></div>` : ''}
      ${m.dataFields.length ? `<div style="margin-top:6px;"><strong>Missing Data (${m.dataFields.length}):</strong><ul style="margin:4px 0 0 18px;">${dataItems}</ul></div>` : ''}
    </div>`;
}

function openSubmissionVersionHistoryModal(subId) {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId);
  const modal = document.getElementById("intakeVersionListModal");
  const body = document.getElementById("intakeVersionListModalBody");
  const titleEl = document.getElementById("intakeVersionListModalTitle");
  if (!sub || !modal || !body) return;

  const versions = ensureSubmissionVersionSeed(sub);
  const thread = ensureCommunicationThreadSeed(sub);
  titleEl.textContent = `Submission Data Versions — ${sub.insured} (${subId})`;

  const channelLabel = sub.channelType === "broker" ? `Broker (${sub.broker || "Broker"})` : "Direct Customer Portal";

  const versionRows = versions.slice().reverse().map(v => {
    const changeRows = v.changes.map(c => `
      <div style="font-size:12px; padding:3px 0;">
        <strong>${c.field}:</strong>
        ${c.oldVal !== null ? `<span class="text-muted" style="text-decoration:line-through;">${c.oldVal}</span> → ` : ''}
        <span>${c.newVal}</span>
      </div>`).join("");
    const resolvedDocsHtml = (v.resolvedDocs && v.resolvedDocs.length)
      ? `<div style="font-size:12px; padding:3px 0; color:var(--color-success);"><i class="ph ph-check"></i> Documents received: ${v.resolvedDocs.join(", ")}</div>` : '';
    const resolvedDataHtml = (v.resolvedDataFields && v.resolvedDataFields.length)
      ? `<div style="font-size:12px; padding:3px 0; color:var(--color-success);"><i class="ph ph-check"></i> Data supplied: ${v.resolvedDataFields.join(", ")}</div>` : '';
    const newMissingDocsHtml = (v.newMissingDocs && v.newMissingDocs.length)
      ? `<div style="font-size:12px; padding:3px 0; color:var(--color-danger);"><i class="ph ph-warning"></i> Newly flagged missing documents: ${v.newMissingDocs.join(", ")}</div>` : '';
    const newMissingDataHtml = (v.newMissingDataFields && v.newMissingDataFields.length)
      ? `<div style="font-size:12px; padding:3px 0; color:var(--color-danger);"><i class="ph ph-warning"></i> Newly flagged missing data: ${v.newMissingDataFields.join(", ")}</div>` : '';
    return `
      <div class="card mb-2" style="padding:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span class="badge ${v.version === versions.length ? 'badge-success' : 'badge-info'} font-mono">v${v.version}</span>
          <span class="text-xs text-muted">${v.at} • ${v.by}${v.updateType ? ` • ${UPDATE_TYPE_LABELS[v.updateType] || v.updateType}` : ''}</span>
        </div>
        ${changeRows}
        ${resolvedDocsHtml}${resolvedDataHtml}${newMissingDocsHtml}${newMissingDataHtml}
      </div>`;
  }).join("");

  body.innerHTML = `
    <div class="alert alert-info mb-3" style="font-size:12.5px;">
      <i class="ph ph-info"></i> Every update below travels through the <strong>same channel the submission originally arrived on</strong>: <strong>${channelLabel}</strong>. This history tracks customer-provided data changes — not quote/rating versions. The submission stays within the Intake workflow.
    </div>

    ${renderMissingItemsSummaryHtml(sub)}

    <div class="filter-tabs mb-3 mt-3" id="subHistoryTabNav">
      <button class="tab-btn active" id="subHistoryTabThread" onclick="switchSubHistoryTab('${subId}', 'thread')"><i class="ph ph-chat-dots"></i> Communication Thread</button>
      <button class="tab-btn" id="subHistoryTabVersions" onclick="switchSubHistoryTab('${subId}', 'versions')"><i class="ph ph-stack"></i> Version History</button>
    </div>

    <div id="subHistoryPanelThread">
      ${renderCommunicationThreadHtml(sub)}
    </div>
    <div id="subHistoryPanelVersions" style="display:none;">
      ${versionRows}
    </div>

    <div class="mt-3" style="text-align:right;">
      <button class="btn btn-sm btn-primary" onclick="closeIntakeVersionListModal(); openEditSubmissionDataModal('${subId}');">
        <i class="ph ph-pencil-simple"></i> Log Customer Communication & Update
      </button>
    </div>
  `;

  modal.style.display = "flex";
}

function switchSubHistoryTab(subId, tab) {
  const tabThread = document.getElementById("subHistoryTabThread");
  const tabVersions = document.getElementById("subHistoryTabVersions");
  const panelThread = document.getElementById("subHistoryPanelThread");
  const panelVersions = document.getElementById("subHistoryPanelVersions");
  if (tabThread) tabThread.classList.toggle("active", tab === "thread");
  if (tabVersions) tabVersions.classList.toggle("active", tab === "versions");
  if (panelThread) panelThread.style.display = tab === "thread" ? "block" : "none";
  if (panelVersions) panelVersions.style.display = tab === "versions" ? "block" : "none";
}

function closeIntakeVersionListModal() {
  const modal = document.getElementById("intakeVersionListModal");
  if (modal) modal.style.display = "none";
}

let editSubmissionTargetId = null;

function openEditSubmissionDataModal(subId) {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === subId);
  const modal = document.getElementById("editSubmissionDataModal");
  const body = document.getElementById("editSubmissionDataModalBody");
  if (!sub || !modal || !body) return;

  if (!hasPermission("submissionData", "edit")) {
    denyPermission("submissionData", "edit");
    return;
  }

  editSubmissionTargetId = subId;
  const channelLabel = sub.channelType === "broker" ? `Broker Email (${sub.broker || "Broker"})` : "Direct Customer Portal";
  const party = getChannelPartyLabel(sub);
  const missing = ensureMissingItemsSeed(sub);

  const missingDocsChecklist = missing.documents.map((d, i) => `
    <label style="display:flex; align-items:center; gap:8px; font-size:12.5px; padding:3px 0;">
      <input type="checkbox" class="missing-doc-resolve-cb" value="${i}" style="width:16px; height:16px;"> Received: ${d}
    </label>`).join("");
  const missingDataChecklist = missing.dataFields.map((d, i) => `
    <label style="display:flex; align-items:center; gap:8px; font-size:12.5px; padding:3px 0;">
      <input type="checkbox" class="missing-data-resolve-cb" value="${i}" style="width:16px; height:16px;"> Supplied: ${d}
    </label>`).join("");

  const fieldsHtml = SUBMISSION_EDITABLE_FIELDS.map(f => `
    <div class="form-group mb-2">
      <label style="font-weight:600; font-size:12px;">${f.label}</label>
      <input type="${f.isNumber ? 'number' : 'text'}" id="editSubField_${f.key}" class="form-control" value="${sub[f.key] != null ? sub[f.key] : ''}">
    </div>`).join("");

  body.innerHTML = `
    <div style="font-size:13px; margin-bottom:10px;">
      <strong>Submission:</strong> <code>${sub.id}</code>
    </div>
    <div class="alert alert-info mb-3" style="font-size:12.5px;">
      <i class="ph ${sub.channelType === 'broker' ? 'ph-briefcase' : 'ph-user'}"></i> This communication will be logged via <strong>${channelLabel}</strong> — the same channel this submission originally arrived through.
    </div>

    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">Type of Update</label>
      <select id="editSubUpdateType" class="form-control">
        <option value="additional">Additional Info Provided by ${party}</option>
        <option value="missing">Missing Info Supplied by ${party}</option>
        <option value="changed">Changed Info / Correction from ${party}</option>
      </select>
    </div>

    ${(missing.documents.length || missing.dataFields.length) ? `
    <div class="card mb-3" style="padding:12px; background:var(--color-warning-bg); border-color:#fde68a;">
      <p class="text-xs" style="font-weight:600; margin-bottom:6px;"><i class="ph ph-warning"></i> Currently Outstanding — check off anything received/supplied in this update:</p>
      ${missingDocsChecklist}
      ${missingDataChecklist}
    </div>` : ''}

    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">Newly Discovered Missing Documents (optional, comma-separated)</label>
      <input type="text" id="editSubNewMissingDocs" class="form-control" placeholder="e.g. Updated MVR Report, Vehicle Title Copy">
    </div>
    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">Newly Discovered Missing Data (optional, comma-separated)</label>
      <input type="text" id="editSubNewMissingData" class="form-control" placeholder="e.g. Years in Business, Prior Carrier Name">
    </div>

    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">Customer Message (Incoming, via ${channelLabel})<span style="color:var(--color-danger);"> *</span></label>
      <textarea id="editSubCustomerMessage" class="form-control" rows="3" placeholder="What the customer/broker communicated — e.g. 'Updated garaging address effective next month' or 'Attached corrected FEIN document'..."></textarea>
    </div>

    <div class="form-group mb-3">
      <label style="font-weight:600; font-size:12px;">Our Response (Optional, sent back via ${channelLabel})</label>
      <textarea id="editSubResponseMessage" class="form-control" rows="2" placeholder="Optional reply confirming receipt or requesting further detail..."></textarea>
    </div>

    <hr style="border-color:var(--color-border); margin:16px 0;">
    <p class="text-xs text-muted mb-2">Update the submission fields below to match what was communicated:</p>
    ${fieldsHtml}
  `;

  modal.style.display = "flex";
}

function closeEditSubmissionDataModal() {
  const modal = document.getElementById("editSubmissionDataModal");
  if (modal) modal.style.display = "none";
  editSubmissionTargetId = null;
}

function saveSubmissionDataEdit() {
  const sub = SUBMISSIONS_DATASET.find(s => s.id === editSubmissionTargetId);
  if (!sub) return;

  if (!hasPermission("submissionData", "edit")) {
    denyPermission("submissionData", "edit");
    return;
  }

  const customerMessage = document.getElementById("editSubCustomerMessage").value.trim();
  if (!customerMessage) {
    showToast("⛔ Enter the customer's message before saving — every version must trace back to the communication that prompted it.", "danger");
    return;
  }

  const roleConfig = USER_ROLES_CONFIG[currentUserRole] || USER_ROLES_CONFIG.junior;
  const updateType = document.getElementById("editSubUpdateType").value;
  const responseMessage = document.getElementById("editSubResponseMessage").value.trim();
  const versions = ensureSubmissionVersionSeed(sub);
  const thread = ensureCommunicationThreadSeed(sub);
  const missing = ensureMissingItemsSeed(sub);
  const changes = [];

  SUBMISSION_EDITABLE_FIELDS.forEach(f => {
    const inputEl = document.getElementById(`editSubField_${f.key}`);
    if (!inputEl) return;
    let newVal = inputEl.value;
    if (f.isNumber) newVal = parseInt(newVal, 10) || 0;
    const oldVal = sub[f.key];
    if (String(oldVal) !== String(newVal)) {
      changes.push({ field: f.label, oldVal: f.isNumber ? `$${(oldVal || 0).toLocaleString()}` : (oldVal || "—"), newVal: f.isNumber ? `$${newVal.toLocaleString()}` : newVal });
      sub[f.key] = newVal;
    }
  });

  // Keep the display-formatted exposure string in sync if exposureVal changed
  if (changes.some(c => c.field === "Exposure Value")) {
    sub.exposure = `$${sub.exposureVal.toLocaleString()}`;
  }

  // Resolve checked-off missing documents / data fields
  const resolvedDocs = [];
  document.querySelectorAll(".missing-doc-resolve-cb:checked").forEach(cb => {
    resolvedDocs.push(missing.documents[parseInt(cb.value, 10)]);
  });
  const resolvedDataFields = [];
  document.querySelectorAll(".missing-data-resolve-cb:checked").forEach(cb => {
    resolvedDataFields.push(missing.dataFields[parseInt(cb.value, 10)]);
  });
  if (resolvedDocs.length) missing.documents = missing.documents.filter(d => !resolvedDocs.includes(d));
  if (resolvedDataFields.length) missing.dataFields = missing.dataFields.filter(d => !resolvedDataFields.includes(d));

  // Newly discovered missing documents / data
  const newMissingDocsRaw = document.getElementById("editSubNewMissingDocs").value.trim();
  const newMissingDataRaw = document.getElementById("editSubNewMissingData").value.trim();
  const newMissingDocs = newMissingDocsRaw ? newMissingDocsRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
  const newMissingDataFields = newMissingDataRaw ? newMissingDataRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
  if (newMissingDocs.length) missing.documents.push(...newMissingDocs);
  if (newMissingDataFields.length) missing.dataFields.push(...newMissingDataFields);

  const hasMissingItemActivity = resolvedDocs.length > 0 || resolvedDataFields.length > 0 || newMissingDocs.length > 0 || newMissingDataFields.length > 0;

  const nowStamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  const channelVia = sub.channelType === "broker" ? `Broker Email (${sub.broker || "Broker"})` : "Direct Customer Portal";
  const party = getChannelPartyLabel(sub);

  // 1. Log the incoming customer/broker communication on the SAME channel the
  //    submission originally arrived through.
  thread.push({
    direction: "inbound",
    via: channelVia,
    from: party,
    to: "Underwriting Team",
    at: nowStamp,
    updateType,
    message: customerMessage
  });

  // 2. Optionally log our reply on the same channel.
  if (responseMessage) {
    thread.push({
      direction: "outbound",
      via: channelVia,
      from: party,
      to: roleConfig.name,
      at: nowStamp,
      updateType: null,
      message: responseMessage
    });
  }

  // 3. Create a new submission version if field data changed OR missing
  //    documents/data were resolved or newly flagged — either way the
  //    version links back to this exact communication exchange.
  if (changes.length > 0 || hasMissingItemActivity) {
    versions.push({
      version: versions.length + 1,
      at: nowStamp,
      by: `${roleConfig.name} (${roleConfig.title})`,
      changes,
      updateType,
      resolvedDocs,
      resolvedDataFields,
      newMissingDocs,
      newMissingDataFields,
      threadRef: thread.length - (responseMessage ? 2 : 1)
    });
    const summaryParts = [];
    if (changes.length) summaryParts.push(`${changes.length} field${changes.length > 1 ? 's' : ''} updated`);
    if (resolvedDocs.length || resolvedDataFields.length) summaryParts.push(`${resolvedDocs.length + resolvedDataFields.length} outstanding item(s) resolved`);
    if (newMissingDocs.length || newMissingDataFields.length) summaryParts.push(`${newMissingDocs.length + newMissingDataFields.length} new item(s) flagged missing`);
    showToast(`✅ Submission version ${versions.length} recorded for ${sub.id} via ${channelVia} (${summaryParts.join(", ")}). Submission remains in Intake.`, "success");
  } else {
    showToast(`✅ Communication logged via ${channelVia}. No field values or missing-item status changed, so no new version was created.`, "info");
  }

  closeEditSubmissionDataModal();
  renderSubmissionsTable();
  refreshTeamActivityIfVisible(); refreshAuditLogIfVisible();
}

function renderQuoteVersionsLedger() {
  const container = document.getElementById("quoteVersionCardsContainer");
  const kpiTotal = document.getElementById("kpiTotalVersions");
  const kpiBound = document.getElementById("kpiBoundCount");
  if (!container) return;

  const allQuotes = getAllFlatQuotes();
  if (kpiTotal) kpiTotal.textContent = `${allQuotes.length} Quotes`;
  const boundCount = allQuotes.filter(q => q.isBound).length;
  if (kpiBound) kpiBound.textContent = `${boundCount} Bound`;

  let matchingSubs = QUOTE_VERSIONS_DATASET;

  // Filter by Submission
  if (activeVersionSubFilter !== "all") {
    matchingSubs = matchingSubs.filter(s => s.subId === activeVersionSubFilter);
  }

  const query = (document.getElementById("versionSearchInput")?.value || "").toLowerCase();

  let html = "";
  let totalVisibleQuotes = 0;

  matchingSubs.forEach(sub => {
    let subQuotes = sub.quotes;

    // Filter by Status Tab
    if (activeVersionStatusFilter === "bound") {
      subQuotes = subQuotes.filter(q => q.isBound);
    } else if (activeVersionStatusFilter === "active") {
      subQuotes = subQuotes.filter(q => q.isLatest && !q.isBound);
    } else if (activeVersionStatusFilter === "superceded") {
      subQuotes = subQuotes.filter(q => !q.isLatest && !q.isBound);
    }

    // Filter by Search Query
    if (query) {
      subQuotes = subQuotes.filter(q => 
        sub.insured.toLowerCase().includes(query) ||
        sub.subId.toLowerCase().includes(query) ||
        q.quoteNo.toLowerCase().includes(query) ||
        q.status.toLowerCase().includes(query) ||
        q.notes.toLowerCase().includes(query)
      );
    }

    if (subQuotes.length === 0) return;

    totalVisibleQuotes += subQuotes.length;

    html += `
      <div class="sub-version-group-card">
        <div class="sub-group-header">
          <div class="sub-group-title-box">
            <i class="ph ph-tree-structure text-primary" style="font-size: 18px;"></i>
            <div>
              <div class="sub-group-title">${sub.insured}</div>
              <div class="sub-group-meta">${sub.subId} • ${sub.lob} • Producer: <strong>${sub.broker}</strong></div>
            </div>
          </div>
          <span class="badge badge-info font-bold">${subQuotes.length} ${subQuotes.length === 1 ? 'Quote' : 'Quotes'}</span>
        </div>
        <div class="table-responsive">
          <table class="sub-version-table">
            <thead>
              <tr>
                <th style="width: 85px;">Version</th>
                <th>Quote Number</th>
                <th>Generated Date</th>
                <th>Author / Role</th>
                <th>Base Coverage</th>
                <th>Discounts</th>
                <th>Fees & Taxes</th>
                <th>Total Premium</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${subQuotes.map(q => {
                let tagClass = "v-old";
                if (q.isBound) tagClass = "v-bound";
                else if (q.isLatest) tagClass = "v-latest";

                let trClass = q.isBound ? "is-bound" : (q.isLatest ? "is-latest" : "");

                return `
                  <tr class="${trClass}">
                    <td>
                      <span class="version-num-tag ${tagClass}">
                        <i class="ph ph-tag"></i> ${q.versionTag}
                      </span>
                    </td>
                    <td>
                      <strong class="font-mono text-primary">${q.quoteNo}</strong>
                      <div class="text-xs text-muted">${q.type}</div>
                    </td>
                    <td class="text-xs font-mono text-muted">${q.date}</td>
                    <td style="font-size: 11.5px; font-weight: 600; color: #334155;">${q.author}</td>
                    <td class="font-mono font-bold text-primary">$${(q.baseCoveragePremium || 35062).toLocaleString()}</td>
                    <td class="font-mono font-bold text-success">-$${Math.abs(q.appliedDiscounts || 2805).toLocaleString()}</td>
                    <td class="font-mono text-muted">+$${(q.feesAndTaxes || 7003).toLocaleString()}</td>
                    <td>
                      <strong class="font-mono" style="font-size: 14px; color: ${q.isBound ? '#16a34a' : '#0f172a'}; font-weight: 900;">
                        $${q.premium.toLocaleString()}
                      </strong>
                    </td>
                    <td>
                      <span class="badge ${q.statusBadge}">${q.status}</span>
                    </td>
                    <td style="text-align: right;">
                      <button class="btn btn-xs btn-outline-primary" onclick="openQuoteVersionPreviewModal('${q.versionId}')" title="View Full Actuarial Quote Sheet" style="font-weight: 700;">
                        <i class="ph ph-receipt"></i> View Quote Sheet
                      </button>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  if (totalVisibleQuotes === 0) {
    container.innerHTML = `
      <div class="card p-4 text-center text-muted">
        <i class="ph ph-magnifying-glass mb-2" style="font-size: 24px; color: #94a3b8;"></i>
        <h4>No Quote Versions Found</h4>
        <p style="font-size: 12px; margin: 4px 0 0 0;">No quote records match the current filter or search criteria.</p>
      </div>
    `;
  } else {
    container.innerHTML = html;
  }
}

function filterQuoteVersions(status) {
  activeVersionStatusFilter = status;
  const tabs = document.querySelectorAll("#versionStatusFilterTabs .tab-btn");
  tabs.forEach(t => t.classList.remove("active"));

  if (status === "all") document.getElementById("tabFilterVerAll")?.classList.add("active");
  if (status === "bound") document.getElementById("tabFilterVerBound")?.classList.add("active");
  if (status === "active") document.getElementById("tabFilterVerActive")?.classList.add("active");
  if (status === "superceded") document.getElementById("tabFilterVerSuperceded")?.classList.add("active");

  renderQuoteVersionsLedger();
}

function onVersionSubSelectChange(subId) {
  activeVersionSubFilter = subId;
  renderQuoteVersionsLedger();
}

function searchQuoteVersionsTable() {
  renderQuoteVersionsLedger();
}

function openQuoteVersionPreviewModal(verId) {
  const modal = document.getElementById("quoteVersionPreviewModal");
  const modalBody = document.getElementById("quoteVersionPreviewModalBody");
  const title = document.getElementById("modalQuotePreviewTitle");
  const sub = document.getElementById("modalQuotePreviewSub");
  if (!modal || !modalBody) return;

  const allQuotes = getAllFlatQuotes();
  const q = allQuotes.find(item => item.versionId === verId) || allQuotes[0];

  if (title) title.textContent = `Quote Document: ${q.quoteNo} (${q.versionTag}) • $${q.premium.toLocaleString()}.00`;
  if (sub) sub.textContent = `${q.insured} • ${q.subId} • Issued: ${q.date} • ${q.type}`;

  const payload = q.ratingPayload || DEFAULT_IMPORTED_RATING_JSON;
  modalBody.innerHTML = `
    <div style="max-height: 78vh; overflow-y: auto; padding: 4px;">
      ${getGeneratedQuoteHtml(payload, q)}
    </div>
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeQuoteVersionPreviewModal() {
  const modal = document.getElementById("quoteVersionPreviewModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function exportQuoteVersionsCSV() {
  const allQuotes = getAllFlatQuotes();
  const headers = ["Submission ID", "Named Insured", "Line of Business", "Producing Broker", "Version", "Quote Number", "Type", "Generated Date", "Author", "Gross Premium", "Limits", "Deductible", "Status", "Notes"];

  const rows = allQuotes.map(q => [
    `"${q.subId}"`,
    `"${q.insured}"`,
    `"${q.lob}"`,
    `"${q.broker}"`,
    `"${q.versionTag}"`,
    `"${q.quoteNo}"`,
    `"${q.type}"`,
    `"${q.date}"`,
    `"${q.author}"`,
    q.premium,
    `"${q.liabilityLimit}"`,
    `"${q.pdDeductible}"`,
    `"${q.status}"`,
    `"${q.notes.replace(/"/g, '""')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Quote_Version_History_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("📥 Quote Version History exported to CSV!", "success");
}

// Toast Helper
function showToast(msg, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  let icon = "ph-info";
  if (type === "success") icon = "ph-check-circle";
  if (type === "warning") icon = "ph-warning";
  if (type === "danger") icon = "ph-prohibit";

  toast.innerHTML = `<i class="ph ${icon}"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px) scale(0.95)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================================================
// 8. EXPOSE GLOBALS ON WINDOW OBJECT (100% Reliability)
// ============================================================================
window.showIntakePage = showIntakePage;
window.showWorkflowPage = showWorkflowPage;
window.showArchivePage = showArchivePage;
window.showQuoteVersionsPage = showQuoteVersionsPage;
window.renderQuoteVersionsLedger = renderQuoteVersionsLedger;
window.filterQuoteVersions = filterQuoteVersions;
window.onVersionSubSelectChange = onVersionSubSelectChange;
window.searchQuoteVersionsTable = searchQuoteVersionsTable;
window.openQuoteVersionPreviewModal = openQuoteVersionPreviewModal;
window.closeQuoteVersionPreviewModal = closeQuoteVersionPreviewModal;
window.exportQuoteVersionsCSV = exportQuoteVersionsCSV;
window.viewCase = viewCase;
window.resumeActiveCaseWorkflow = resumeActiveCaseWorkflow;
window.changeUserRole = changeUserRole;
window.submitJuniorEscalation = submitJuniorEscalation;
window.goToScreen = goToScreen;
window.navigateStep = navigateStep;
window.toggleSidebar = toggleSidebar;
window.togglePhaseGroup = togglePhaseGroup;
window.toggleAllPhases = toggleAllPhases;
window.selectSubmission = selectSubmission;
window.openCaseAtCurrentStep = openCaseAtCurrentStep;
window.resumeCaseFlow = resumeCaseFlow;
window.resumeActiveCaseFlow = resumeActiveCaseFlow;
window.openViewCaseModal = openViewCaseModal;
window.closeViewCaseModal = closeViewCaseModal;
window.proceedToNormalizationFromModal = proceedToNormalizationFromModal;
window.previewDocModal = previewDocModal;
window.closeDocPreviewModal = closeDocPreviewModal;
window.proceedToNormalizationFromDocModal = proceedToNormalizationFromDocModal;
window.printDocPreview = printDocPreview;
window.filterSubmissionsTable = filterSubmissionsTable;
window.searchSubmissionsTable = searchSubmissionsTable;
window.changeQueueSorting = changeQueueSorting;
window.escalateSubmissionPriority = escalateSubmissionPriority;
window.openNewIntakeModal = openNewIntakeModal;
window.closeNewIntakeModal = closeNewIntakeModal;
window.toggleModalBrokerField = toggleModalBrokerField;
window.handleCreateNewIntake = handleCreateNewIntake;
window.switchDocTab = switchDocTab;
window.renderRatingEnginePayload = renderRatingEnginePayload;
window.exportRatingPayloadToCSV = exportRatingPayloadToCSV;
window.copyRatingJSON = copyRatingJSON;
window.downloadRatingJSON = downloadRatingJSON;
window.toggleJSONWrap = toggleJSONWrap;
window.setExposureScenario = setExposureScenario;
window.triggerDuplicateExit = triggerDuplicateExit;
window.triggerAppetiteFailureExit = triggerAppetiteFailureExit;
window.seniorUWAction = seniorUWAction;
window.openRFIModal = openRFIModal;
window.closeRFIModal = closeRFIModal;
window.sendRFIAction = sendRFIAction;
window.addNewSubjectivity = addNewSubjectivity;
window.issueQuoteAction = issueQuoteAction;
window.bindPolicyAction = bindPolicyAction;
window.requestBrokerRevision = requestBrokerRevision;
window.expireQuoteAction = expireQuoteAction;
window.printQuote = printQuote;
window.downloadQuoteDoc = downloadQuoteDoc;
window.closeFlowchartModal = closeFlowchartModal;
window.navFromDiagram = navFromDiagram;
window.toggleBrowserFullscreen = toggleBrowserFullscreen;
window.goToNextStep = goToNextStep;
window.goToPrevStep = goToPrevStep;
window.updateBottomFooter = updateBottomFooter;
window.previewDocForSubmission = previewDocForSubmission;
window.openAllDocsModal = openAllDocsModal;
window.downloadCurrentPreviewDoc = downloadCurrentPreviewDoc;
window.openDocsManagerModal = openDocsManagerModal;
window.switchHubDoc = switchHubDoc;
window.closeCaseDocsModal = closeCaseDocsModal;
window.proceedToCaseFromDocsModal = proceedToCaseFromDocsModal;
window.onManualAssignmentChange = onManualAssignmentChange;
window.openAllStepsSummaryModal = openAllStepsSummaryModal;
window.closeAllStepsSummaryModal = closeAllStepsSummaryModal;
window.switchSummaryModalTab = switchSummaryModalTab;
window.renderAllStepsSummaryModal = renderAllStepsSummaryModal;
window.renderStep7InlineSummary = renderStep7InlineSummary;
window.renderStep7View = renderStep7View;
window.toggleStep7View = toggleStep7View;
window.getGeneratedQuoteHtml = getGeneratedQuoteHtml;
window.renderGeneratedQuoteContent = renderGeneratedQuoteContent;
window.updateIssuanceRecipientUI = updateIssuanceRecipientUI;
window.openImportQuoteJsonModal = openImportQuoteJsonModal;
window.closeImportQuoteJsonModal = closeImportQuoteJsonModal;
window.handleJsonDragLeave = handleJsonDragLeave;
window.handleJsonFileDrop = handleJsonFileDrop;

window.getSubmissionRatingPayload = getSubmissionRatingPayload;
window.renderUnderwritingWorkbench = renderUnderwritingWorkbench;
window.renderAppetiteRules = renderAppetiteRules;
window.toggleAppetiteRuleOverride = toggleAppetiteRuleOverride;
window.validateVehicleBaseRateOverride = validateVehicleBaseRateOverride;

window.showProductApiIntegrationPage = showProductApiIntegrationPage;
window.triggerProductApiIngestion = triggerProductApiIngestion;
window.copyProductApiJson = copyProductApiJson;
window.downloadProductApiJson = downloadProductApiJson;


