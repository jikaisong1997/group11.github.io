var config = {
    style: 'mapbox://styles/ucfnhbe/cl33sfgcq00af14p6nb4mwo8f',
    accessToken: 'pk.eyJ1IjoidWNmbmhiZSIsImEiOiJja3lsZGx5dDcxeGd2Mm5vNjM0NGkybTF5In0.XIM3mtJ_YL7CgW1Qt_Salw',
    showMarkers: false,
    markerColor: '#3FB1CE',
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: true,
    theme: 'light',
    use3dTerrain: false, //set true for enabling 3D maps.
    title: 'UK to Other Countries',
    subtitle: 'A descriptive analysis on Covid-related policies',
    byline: '',
    footer: 'Made by Lucia',
    chapters: [
        {
            id: 'UK',
            alignment: 'right',
            hidden: false,
            title: 'COVID-19 Response: Living with COVID-19',
            //image: './images/uk.png',
            description: 'In the current stage, UK Government’s objective is to manage COVID-19 like other regular illnesses, while minimising mortality and retaining the ability to respond to new variant.To meet this objective. The Government structures its ongoing response around four principles: a. Living with COVID-19: removing restrictions while encouraging safer behaviours through public health advice. b. Protecting the most vulnerable people based on JCVI guidance; c. Maintaining resilience; d. Securing innovations and opportunities from the COVID-19 response, including investment in life sciences.<p><iframe id="linechart" src="line_uk.html" frameBorder="0" height="500px" width="400px" ></iframe></p>',

            
            location: {
                center: [1.80001, 52.45976],
                zoom: 5.06,
                pitch: 45.00,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [  
                { 
                    layer: 'uk',
                     opacity: 0.5,
                     duration: 5000},
                { 
                    layer: 'england-54ki64',
                     opacity: 0,
                     duration: 5000}

                
            ],
            onChapterExit: [ 
            ]
        },
            {
            id: 'england',
            alignment: 'left',
            hidden: false,
            title: 'What is the guidance across UK now? -- England ',
            description: 'The government of England advises wearing a mask in crowded and enclosed settings where you may come into touch with persons you do not ordinarily meet.  In NHS hospitals, GP surgeries, and emergency rooms, face coverings are still necessary, but people are no longer expected to maintain social distance from one another.  If you test positive for Covid, you are no longer legally compelled to self-isolate, but you should stay at home for at least five days and avoid contact with people.',
            showMarkers: true,
            location: {
                center: [-2.14858, 51.14420],
                zoom: 5.80,
                pitch: 45.00,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [   { 
                    layer: 'uk',
                     opacity: 0,
                     duration: 5000},
                { 
                    layer: 'england-54ki64',
                     opacity: 0.5,
                     duration: 5000}
            ],
            onChapterExit: [
                 { 
                    layer: 'uk',
                     opacity: 0,
                 duration: 5000},
                {
                     layer: 'england-54ki64',
                     opacity: 0.5
                 },

                
            ]
        },
                 {
            id: 'Scotland',
            alignment: 'left',
            hidden: false,
            title: 'Scotland',
            description: 'The legal ban on face coverings in Scotland has been lifted, but the Scottish government still advises wearing a mask in public venues and on public transportation. People who have symptoms are no longer required to take a PCR test; instead, they are urged to stay at home until they feel better. The testing for the broader public is now complete. The Scottish government has also stated that the domestic portion of their vaccine passport scheme will be switched off.',
            location: {
                center: [-4.50772, 55.72128],
                zoom: 6.35,
                pitch: 45.00,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { 
                     layer: 'scotland-10umus',
                     opacity: 0.5,
                     duration: 5000},
                { 
                     layer: 'england-54ki64',
                     opacity: 0,
                     duration: 5000}
            ],
            onChapterExit: [
                 {
                     layer: 'scotland-10umus',
                     opacity: 0.5
                 }
            ]
        },
        
         {
            id: 'NI',
            alignment: 'left',
            hidden: false,
            title: 'What about North Ireland…',
            description: 'Face masks are still recommended by the government in specific situations, including confined public venues and health and social care facilities.',
            location: {
                center: [-7.42949, 54.49903],
                zoom: 7.81,
                pitch: 45.00,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { 
                     layer: 'scotland-10umus',
                     opacity: 0,
                     duration: 5000},
                { 
                     layer: 'ni-bqxpov',
                     opacity: 0.5,
                     duration: 5000}
            ],
            onChapterExit: [
                 {
                     layer: 'ni-bqxpov',
                     opacity: 0.5
                 },
                            { 
                     layer: 'scotland-10umus',
                     opacity: 0,
                     duration: 5000}
            ]
        },
         {
            id: 'wales',
            alignment: 'left',
            hidden: false,
            title: 'Wales',
            description: 'Although masks are no longer needed in stores or on public transportation, they are nevertheless necessary in health and social care situations. Self-isolation is no longer required by law for persons who have Covid, though it is strongly recommended. Until the end of June, Wales will keep some testing measures:',
            location: {
                center: [-4.21938, 51.97553],
                zoom: 7.25,
                pitch: 45.00,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { 
                     layer: 'ni-bqxpov',
                     opacity: 0,
                     duration: 5000},
                { 
                     layer: 'wales-3yn0qu',
                     opacity: 0.5,
                     duration: 5000 },
				{ 
                     layer: 'england-54ki64',
                     opacity: 0,
                     duration: 5000},
			
            ],
            onChapterExit: [
                 {
                     layer: 'wales-3yn0qu',
                     opacity: 0.5
                 },
                {
                     layer: 'uk',
                     opacity: 0
                 },
				{ 
                     layer: 'ni-bqxpov',
                     opacity: 0,
                     duration: 5000}
            ]
        },
        
        
        
        {
            id: 'second-identifier',
            alignment: 'left',
            hidden: false,
            title: 'Japan: ‘State of Emergency’ rather than lockdown. ',
            image: './images/japan.png',
            description: 'Throughout the pandemic, instead of a hard lockdown, the Japanese government choose to declare a ‘state of emergency’ every when the virus waves become served. The state of emergency does not imply a complete lockdown like in other nations, but it "suggest" citizens to remain at home except for needed duties. Anything judged vital to maintaining life, such as going to the hospital, buying food, and commuting to work, are considered essential. does place limitations on "non-essential" activities like travel and dining out. Depending on the situation, the time and scale of the ‘emergency states’ are also different.',
            location: {
                center: [132.65908, 38.43701],
                zoom: 4.53,
                pitch: 45.00,
                bearing: 0
                // flyTo additional controls-
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                //speed: 2, // make the flying slow
                //curve: 1, // change the speed at which it zooms out
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ 
                     layer: 'JPN',
                     opacity: 0.5,
                     duration: 5000}
            ],
            onChapterExit: [
                 {
                     layer: 'JPN',
                     opacity: 0.5
                 },
               ],
        },
        
        
        
        {
            id: 'japan2',
            alignment: 'right',
            hidden: false,
            title: 'Japan: trend and future ',
            description: 'Future trend: Although there’s no public announcement such as ‘living with the virus’ has been announced officially. Public leaders ranging from Tokyos governor to former Prime Minister Shinzo Abe have expressed support for reducing the virus legal status in Japan, citing evidence that shows omicron poses a lower risk than prior strains. Patients would have more access to health care as a result of the modification, which basically makes the virus look like the flu.<p><iframe id="linechart" src="line_jp.html" frameBorder="0" height="500px" width="400px" ></iframe></p>',
            location: {
                center: [147.00049, 39.75928],
                zoom: 4.36,
                pitch: 45.00,
                bearing: 0
                // flyTo additional controls-
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                //speed: 2, // make the flying slow
                //curve: 1, // change the speed at which it zooms out
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ 
                     layer: 'JPN',
                     opacity: 0.5,
                     duration: 5000}
            ],
            onChapterExit: [
                 {
                     layer: 'JPN',
                     opacity: 0.5
                 },
               ],
        },
        {
            id: 'third-identifier',
            alignment: 'left',
            hidden: false,
            title: 'Australia  – ‘National Plan’',
            description: 'On 6, August 2021, Australia’s ‘National Plan’ has been published and agreed upon by all the States and Territories at National Cabinet. This plan has clearly summarized and directed the government acts during the pandemic and post-covid in four phases, giving Australia a clear path and targets for how to do that. The imposition of the plan also claims the country of 25 million people, which was once a champion of a COVID-zero policy to manage the pandemic, has now turned to ‘living with the virus’ through widespread vaccines, as the Delta form has proven too contagious to suppress.<p><iframe id="linechart" src="line_Au.html" frameBorder="0" height="500px" width="400px" ></iframe></p>',
            location: {
                center: [128.07145, -30.26225],
                zoom: 4.23,
                pitch: 45.0,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ 
                     layer: 'AUS',
                     opacity: 0.5,
                     duration: 5000}
            ],
            onChapterExit: [
                 {
                     layer: 'AUS',
                     opacity: 0.5
                 },
               ],

        },
        {
            id: 'fourth-chapter',
            alignment: 'left',
            hidden: false,
            title: 'Phase A: Vaccinate, Prepare and Pilot',
            description: 'From 19 Jan, 2020 to 20 Oct 2021, continuing to strongly suppress the virus for the purpose of minimizing community transmission. Measures may include accelerating vaccination rates; Close international borders, and Early, stringent, and short lockdowns if outbreaks occur. ',
            location: {
                center: [128.07145, -30.26225],
                zoom: 4,
                pitch: 45,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ 
                     layer: 'AUS',
                     opacity: 0.5,
                     duration: 5000}],
            onChapterExit: [{ 
                     layer: 'AUS',
                     opacity: 0.5,
                     duration: 5000}]
        },
		{
            id: 'five',
            alignment: 'left',
            hidden: false,
            title: 'Phase B: triggered when 70% of adults aged 16+ are fully vaccinated',
            description: 'On 21st October 2021, Federal Health Minister Greg Hunt announced that Australia has officially reached a major vaccination milestone – with more than 70% of the population over the age of 16 now fully vaccinated. This has shown that Australia has moved to the next phase. In this stage, the government will seek to minimize serious illness, hospitalization, and fatalities as a result of COVID-19 with low-level restrictions. Measures may include Minimizing cases in the community through ongoing low-level restrictions; Less frequently lockdowns and introducing new reduced quarantine arrangements for vaccinated residents. ',
            location: {
                center: [128.07145, -30.26225],
                zoom: 4,
                pitch: 45,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ 
                     layer: 'AUS',
                     opacity: 0.5,
                     duration: 5000}],
            onChapterExit: [{ 
                     layer: 'AUS',
                     opacity: 0.5,
                     duration: 5000}]
        },
		{
            id: 'six',
            alignment: 'left',
            hidden: false,
            title: 'Phase C: Vaccination Consolidation Phase – triggered when 80% of adults aged 16+ are fully vaccinated.',
            description: 'In less than one month after phase B, Prime Minister Scott Morrison announced that Australia reached a full inoculation rate of 80% of those aged 16 and older. In this stage, only baseline restrictions will be imposed. ',
            location: {
                center: [128.07145, -30.26225],
                zoom: 4,
                pitch: 45,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ 
                     layer: 'AUS',
                     opacity: 0.5,
                     duration: 5000}],
            onChapterExit: [{ 
                     layer: 'AUS',
                     opacity: 0.5,
                     duration: 5000}]
        },
		{
            id: 'seven',
            alignment: 'left',
            hidden: false,
            title: 'Phase D: Post-Vaccination Phase ',
            description: 'Australia claims to reopen to all fully vaccinated visa holders, welcoming the return of tourists, business travellers, and other visitors from 21 February. This is followed by the ‘staged reopening border plan’ that Scott Morrison announced in November, after that almost 580,000 arrivals come to Australia. This phase shows Australia will manage COVID-19 consistent with public health management of other infectious diseases. Measures may include Open international borders, minimizing cases in the community without ongoing restrictions for lockdowns, and boosters as necessary. ',
            location: {
                center: [128.07145, -30.26225],
                zoom: 4,
                pitch: 45,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ 
                     layer: 'AUS',
                     opacity: 0.5,
                     duration: 5000}],
            onChapterExit: [{ 
                     layer: 'AUS',
                     opacity: 0.5,
                     duration: 5000}]
        }
    ]
};
