/**
 * @typedef {'planned' | 'in-progress' | 'delayed' | 'completed'} ProjectStatus
 */

/**
 * @typedef {Object} InfrastructureProject
 * @property {string} id
 * @property {string} title
 * @property {ProjectStatus} status
 * @property {number} progress
 * @property {number} budget
 * @property {string} department
 * @property {string} startDate
 * @property {string} expectedCompletion
 * @property {string} description
 * @property {[number, number]} coordinates - [lat, lng]
 */

/** @type {InfrastructureProject[]} */
export const mockProjects = [
    {
        id: '1',
        title: 'Downtown Bridge Renovation',
        status: 'in-progress',
        progress: 65,
        budget: 4500000,
        department: 'Department of Transportation',
        startDate: '2025-03-15',
        expectedCompletion: '2026-09-30',
        description:
            'Complete structural renovation of the historic downtown bridge including seismic retrofitting.',
        coordinates: [40.7589, -73.9851],
    },
    {
        id: '2',
        title: 'Central Park Pathway Upgrade',
        status: 'completed',
        progress: 100,
        budget: 1200000,
        department: 'Parks & Recreation',
        startDate: '2024-06-01',
        expectedCompletion: '2025-12-15',
        description:
            'Accessibility improvements and resurfacing of main pathways.',
        coordinates: [40.7829, -73.9654],
    },
    {
        id: '3',
        title: 'Metro Station Expansion - West Side',
        status: 'delayed',
        progress: 35,
        budget: 12000000,
        department: 'Public Transit Authority',
        startDate: '2024-01-10',
        expectedCompletion: '2027-03-20',
        description:
            'Expansion of metro station to accommodate increased ridership and add elevators.',
        coordinates: [40.7614, -73.9776],
    },
    {
        id: '4',
        title: 'Community Library Construction',
        status: 'planned',
        progress: 0,
        budget: 3800000,
        department: 'Department of Culture',
        startDate: '2026-05-01',
        expectedCompletion: '2028-08-15',
        description:
            'New 25,000 sq ft community library with digital learning center.',
        coordinates: [40.7489, -73.968],
    },
    {
        id: '5',
        title: 'Waterfront Promenade Development',
        status: 'in-progress',
        progress: 48,
        budget: 8500000,
        department: 'Urban Development',
        startDate: '2025-02-01',
        expectedCompletion: '2026-11-30',
        description:
            'Creation of 2-mile waterfront promenade with public spaces and green infrastructure.',
        coordinates: [40.7389, -74.0089],
    },
    {
        id: '6',
        title: 'Fire Station #12 Modernization',
        status: 'completed',
        progress: 100,
        budget: 2100000,
        department: 'Fire Department',
        startDate: '2024-04-10',
        expectedCompletion: '2025-10-20',
        description:
            'Complete modernization of Fire Station #12 including new equipment bay.',
        coordinates: [40.7689, -73.982],
    },
    {
        id: '7',
        title: 'Smart Traffic Signal System',
        status: 'in-progress',
        progress: 72,
        budget: 5600000,
        department: 'Department of Transportation',
        startDate: '2024-08-15',
        expectedCompletion: '2026-06-30',
        description:
            'Installation of AI-powered traffic management system across 200 intersections.',
        coordinates: [40.7556, -73.9889],
    },
    {
        id: '8',
        title: 'Solar Panel Installation - City Hall',
        status: 'planned',
        progress: 0,
        budget: 950000,
        department: 'Sustainability Office',
        startDate: '2026-07-01',
        expectedCompletion: '2026-12-15',
        description:
            'Installation of solar panels on City Hall and adjacent municipal buildings.',
        coordinates: [40.7128, -74.006],
    },
    {
        id: '9',
        title: 'Bicycle Lane Network Expansion',
        status: 'delayed',
        progress: 25,
        budget: 3200000,
        department: 'Department of Transportation',
        startDate: '2024-09-01',
        expectedCompletion: '2026-12-31',
        description:
            'Adding 15 miles of protected bicycle lanes throughout the city.',
        coordinates: [40.7489, -73.993],
    },
    {
        id: '10',
        title: 'Stormwater Management System',
        status: 'in-progress',
        progress: 55,
        budget: 6700000,
        department: 'Department of Environmental Protection',
        startDate: '2025-01-20',
        expectedCompletion: '2026-10-31',
        description:
            'Green infrastructure for stormwater management including bioswales and rain gardens.',
        coordinates: [40.7389, -73.9754],
    },
];
