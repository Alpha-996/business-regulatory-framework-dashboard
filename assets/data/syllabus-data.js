window.BRFData = window.BRFData || {};
window.BRFData.units = ["All", "Unit I", "Unit II", "Unit III", "Unit IV", "Unit V"];
window.BRFData.syllabus = [
  {unit:"Unit I", hours:5, subtopics:"Jurisprudence; purpose and function of law; types of law including natural, conventional, physical, civil, constitutional and public/private law.", nature:"Introductory, conceptual and definition-based", scoring:"Medium", why:"Low lecture hours but PYQ asked purpose of law and public law; prepare crisp short notes."},
  {unit:"Unit II", hours:20, subtopics:"Indian Contract Act: contract formation, valid contract essentials, offer/acceptance, consideration, capacity, consent, legality, void/voidable/illegal agreements, discharge, breach, remedies, contingent and quasi-contracts, indemnity, guarantee, bailment and agency.", nature:"Most conceptual and highest answer-writing depth", scoring:"Very High", why:"Largest lecture-hour share and strongest PYQ presence; it supports both 5-mark definitions and 10-mark analytical answers."},
  {unit:"Unit III", hours:10, subtopics:"Sale of Goods Act: contract of sale, sale vs agreement to sell, goods, conditions/warranties, transfer of ownership, non-owner sale, performance, caveat emptor and unpaid seller rights.", nature:"Conceptual, difference-table and rights/remedies focused", scoring:"High", why:"PYQ asked types of goods, condition vs warranty and unpaid seller rights."},
  {unit:"Unit IV", hours:15, subtopics:"Partnership Act: partner, rights, types, partnership features, registration, non-registration, dissolution. LLP Act: meaning, features, advantages, disadvantages, formation and partnership vs LLP.", nature:"Procedure, comparison and memorization-heavy", scoring:"Very High", why:"Second-largest lecture weightage and repeated PYQ presence through LLP, registration and dissolution."},
  {unit:"Unit V", hours:10, subtopics:"Consumer Protection Act, 2019: objectives, features, definitions, who is not consumer, goods/services, unfair trade practice and consumer protection councils.", nature:"Definition-heavy and quick-scoring", scoring:"High", why:"Asked in both groups; definitions and councils can be prepared quickly with high accuracy."}
];
window.BRFData.topicBuckets = [
  {title:"Conceptual Topics", items:["Essentials of valid contract", "Offer and acceptance", "Free consent", "Void/voidable/illegal agreements", "Breach and remedies", "Quasi-contract", "Transfer of ownership", "Caveat emptor"]},
  {title:"Memorization Topics", items:["Types of law", "Types of goods", "Partner rights", "Registration procedure", "Dissolution grounds", "LLP formation", "Consumer definitions", "Consumer councils composition"]},
  {title:"Quick-Scoring Topics", items:["Purpose of law", "Condition vs warranty", "LLP advantages", "Who is not a consumer", "Unpaid seller meaning", "Void vs illegal", "Sale vs agreement to sell", "Central Consumer Protection Council"]},
  {title:"Likely 5-Mark Topics", items:["Essentials of valid contract", "Types of goods", "Consumer definition", "Dissolution of firm", "Void vs illegal", "Condition vs warranty", "LLP advantages", "Purpose of law", "Public law"]},
  {title:"Likely 10-Mark Topics", items:["CPA objectives and unfair trade practice", "LLP vs partnership", "Unpaid seller rights", "Contracts vs agreements", "Remedies for breach", "Registration and non-registration", "Quasi-contract"]}
];
window.BRFData.priorities = {
  "Must Study": [
    ["Essentials of valid contract", "Largest unit and direct PYQ; supports almost every Contract Act answer."],
    ["Void, voidable and illegal agreements", "Direct statement-based PYQ and common distinction area."],
    ["Breach and remedies", "Direct 10-mark PYQ; headings are predictable."],
    ["Quasi-contract", "Direct 10-mark PYQ with standard examples."],
    ["Unpaid seller rights", "Direct 10-mark PYQ under Sale of Goods Act."],
    ["LLP vs partnership", "Direct 10-mark PYQ and easy table marks."],
    ["Registration and non-registration", "Direct 10-mark PYQ and procedure-based."],
    ["Consumer definition/objectives/unfair trade practice", "Asked across Group A and Group B; quick scoring."]
  ],
  "Should Study": [
    ["Offer and acceptance", "Core contract formation concept."],
    ["Consideration and capacity", "Frequent essentials subpoints."],
    ["Indemnity and guarantee", "Classic specific-contract difference."],
    ["Bailment and agency", "Syllabus-listed specific contracts with definitional questions."],
    ["Sale vs agreement to sell", "Classic Sale of Goods distinction."],
    ["Condition vs warranty", "Direct PYQ and repeatable."],
    ["Dissolution of firm", "Direct PYQ and linked to procedure."],
    ["Consumer councils", "Direct subquestion on Central Council composition."]
  ],
  "Quick Revision": [
    ["Jurisprudence", "Low weight; prepare meaning and importance."],
    ["Types of law", "Short-note friendly; revise examples."],
    ["Performance of sale", "Useful but lower than unpaid seller and condition/warranty."],
    ["Sale by non-owner", "Prepare exceptions list."],
    ["LLP disadvantages", "Possible but lower than advantages/comparison."],
    ["Consumer jurisdiction", "Keep broad unless teacher requires monetary thresholds."]
  ]
};
window.BRFData.studyPlan = [
  {day:"Day 1", goal:"Build contract foundation", blocks:"Law overview; agreement and contract; essentials; offer/acceptance; consideration and capacity.", topics:"Contract basics, essentials, offer, acceptance, consideration, capacity.", time:"5.5 h", learn:"Why agreements become enforceable.", memorize:"Offer, acceptance, consideration, capacity, free consent, lawful object.", practice:"Q1 and Q12 outlines.", pyq:"Attempt Group A Q1 and Group B Q12.", revision:"One-page essentials chart.", test:"10-minute oral recall."},
  {day:"Day 2", goal:"Finish Contract Act high-yield areas", blocks:"Void/voidable/illegal; discharge; breach; remedies; contingent/quasi-contracts.", topics:"Void agreements, breach, remedies, contingent, quasi-contract.", time:"6 h", learn:"How defects and breach change enforceability.", memorize:"Remedies and quasi-contract cases.", practice:"One full 10-mark remedies answer.", pyq:"Attempt Q5, Q13, Q15.", revision:"Contract flashcards.", test:"15-question contract quiz."},
  {day:"Day 3", goal:"Master Sale of Goods Act", blocks:"Contract of sale; goods; sale/agreement; conditions/warranties; ownership; unpaid seller.", topics:"Types of goods, condition/warranty, unpaid seller.", time:"5.5 h", learn:"Ownership and seller remedies.", memorize:"Difference tables and LSR hook.", practice:"Q6 and Q11.", pyq:"Attempt Q2, Q6, Q11.", revision:"Unpaid seller mind map.", test:"Explain unpaid seller in 3 minutes."},
  {day:"Day 4", goal:"Complete Partnership Act", blocks:"Features; partner rights/types; registration; non-registration; dissolution.", topics:"Partnership, rights, registration, dissolution.", time:"6 h", learn:"Mutual agency and firm procedure.", memorize:"Registration steps and dissolution grounds.", practice:"Q4 and Q14 outlines.", pyq:"Attempt Q4 and Q14.", revision:"Registration vs non-registration table.", test:"Partnership self-test."},
  {day:"Day 5", goal:"Finish LLP and Consumer Protection", blocks:"LLP features/formation; LLP comparison; consumer definitions; councils; unfair trade practice.", topics:"LLP, Consumer Protection Act.", time:"6 h", learn:"Separate legal entity and consumer rights framework.", memorize:"Consumer exclusions and Central Council composition.", practice:"Q3, Q7, Q9, Q10, Q16(b).", pyq:"Attempt all Unit IV/V PYQs.", revision:"Unit V definition cards.", test:"20-minute mixed test."},
  {day:"Day 6", goal:"Repair weak areas and drill answers", blocks:"Unit I; weak Unit II; difference tables; 5-mark/10-mark drills.", topics:"Unit I and weak areas.", time:"5.5 h", learn:"Types of law and answer templates.", memorize:"Public law, purpose of law, difference headings.", practice:"5 short answers and 3 long outlines.", pyq:"Re-attempt Q8 and Q16(a).", revision:"Definitions bank.", test:"30-minute section test."},
  {day:"Day 7", goal:"Mock and final revision", blocks:"Definitions; difference tables; full mock; correction; final flashcards.", topics:"All units and high-yield questions.", time:"6 h", learn:"No new topic unless essential.", memorize:"Headings and keywords.", practice:"One full mock and answer rewrites.", pyq:"Re-attempt 2025 paper under time.", revision:"Final 48-hour checklist.", test:"Score mock and fix last gaps."}
];