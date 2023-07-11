//----------
//  React Imports
//----------
import { useEffect, useState } from 'react'

//----------
// MUI Imports
//----------
import { Grid, Avatar, Card, Typography, CardContent,Tooltip } from '@mui/material'

//----------
// Other library Imports
//----------
import {
  Marker,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { toast } from 'react-hot-toast'
import Highcharts from 'highcharts'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official';
//----------
// Local Imports
//----------
import { useAuth } from 'src/hooks/useAuth'

//----------
// Constants
//----------
const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'
const options = {
  title: {
    text: 'Total Members chart'
  },
  xAxis: {
    title: 'dd',
    categories: [
      'January',
      'February',
      'March',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'April',
      'November',
      'Decemeber'
    ]
  },
  series: [
    {
      data: [10, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
}

const Dashboard = () => {
  //----------
  //  States
  //----------
  const [categories, setCategories] = useState([])
  const [data, setData] = useState([])
  const [row, setRow] = useState([])
  const [content, setContent] = useState("");
  //----------
  //  Hooks
  //----------
  const auth = useAuth()




  const markers = [
    {
      markerOffset: -30,
      name: "Buenos Aires",
      coordinates: [-58.3816, -34.6037]
    },

    { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  
    { markerOffset: -30, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
   
    { markerOffset: 15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
    { markerOffset: 15, name: "Lima", coordinates: [-77.0428, -12.0464] }
  ];


  //----------
  //  Effects
  //----------
  useEffect(() => {
    const loadData = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/controlpanel`, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`
          }
        })
        .then(response => {
          setCategories(Object.keys(response.data.graph[0].members))
          setRow(Object.values(response.data.graph[0].members))
          setData(response.data)
        })
        .catch(error => {
          toast.error(
            `${error.response ? error.response.status : ''}: ${error.response ? error.response.data.message : error}`
          )
          if (error.response && error.response.status == 401) {
            auth.logout()
          }
        })
    }
    loadData()
  }, [])

  //----------
  //  JSX
  //----------
  return (
    <div>
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Today's Register */}
          <Typography variant='p' sx={{ fontWeight: 'bold' }}>
            Today Register ( {data.usersRegistered?.today})
          </Typography>
          {/* This Week's Register */}
          <Typography variant='p' sx={{ fontWeight: 'bold' }}>
            This Week Register ( {data.usersRegistered?.thisWeek})
          </Typography>
          {/* This Month's Register */}
          <Typography variant='p' sx={{ fontWeight: 'bold' }}>
            This Month Register ( {data.usersRegistered?.thisMonth} )
          </Typography>
          {/* This Year's Register */}
          <Typography variant='p' sx={{ fontWeight: 'bold' }}>
            This Year Register ( {data.usersRegistered?.thisYear} )
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={5} sx={{ mt: 5 }} className='match-height'>
        <Grid item xs={12} md={4}>
          {/* Card displaying total registered users */}
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              {/* Total registered users count */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 1, display: 'flex', justifyContent: 'space-between', fontSize: 20 }}
              >
                {data.usersRegistered?.total}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              {/* Title: Total Registered User */}
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Total Registered User
              </Typography>

              {/* Subtitle: User registration count for today */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mt: 10, display: 'flex', justifyContent: 'center', fontSize: 20 }}
              >
                {data.usersRegistered?.today} User Register Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Card displaying total sales amount */}
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              {/* Total sales amount */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 1, display: 'flex', justifyContent: 'space-between', fontSize: 20 }}
              >
                {data.sales?.total}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              {/* Title: Total Sales Amount */}
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Total Sales Amount
              </Typography>

              {/* Subtitle: Sales generated today */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mt: 10, display: 'flex', justifyContent: 'center', fontSize: 20 }}
              >
                {data.sales?.today} generated today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Card displaying pending level income distributed */}
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              {/* Total pending level income distributed */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 1, display: 'flex', justifyContent: 'space-between', fontSize: 20 }}
              >
                {data.pendingLevelIncomeDistributed?.total}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              {/* Title: Pending Level Income Distributed */}
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Pending Level Income Distributed
              </Typography>

              {/* Subtitle: Distribution today */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mt: 10, display: 'flex', justifyContent: 'center', fontSize: 20 }}
              >
                {data.pendingLevelIncomeDistributed?.today} distributed today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Card displaying paid level income distributed */}
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              {/* Total paid level income distributed */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 1, display: 'flex', justifyContent: 'space-between', fontSize: 20 }}
              >
                {data.paidLevelIncomeDistributed?.total}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              {/* Title: Paid Level Income Distributed */}
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Paid Level Income Distributed
              </Typography>

              {/* Subtitle: Distribution today */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mt: 10, display: 'flex', justifyContent: 'center', fontSize: 20 }}
              >
                {data.paidLevelIncomeDistributed?.today} distributed today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Card displaying pending co-founder income distributed */}
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              {/* Total pending co-founder income distributed */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 1, display: 'flex', justifyContent: 'space-between', fontSize: 20 }}
              >
                {data.pendingCoFounderIncomeDistributed?.total}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              {/* Title: Pending Co-founder Income Distributed */}
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Pending Co-founder Income Distributed
              </Typography>

              {/* Subtitle: Distribution today */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mt: 10, display: 'flex', justifyContent: 'center', fontSize: 20 }}
              >
                {data.pendingCoFounderIncomeDistributed?.today} distributed today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Card displaying paid co-founder income distributed */}
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              {/* Total paid co-founder income distributed */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 1, display: 'flex', justifyContent: 'space-between', fontSize: 20 }}
              >
                {data.paidCoFounderIncomeDistributed?.total}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              {/* Title: Paid Co-founder Income Distributed */}
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Paid Co-founder Income Distributed
              </Typography>

              {/* Subtitle: Distribution today */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mt: 10, display: 'flex', justifyContent: 'center', fontSize: 20 }}
              >
                {data.paidCoFounderIncomeDistributed?.today} distributed today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Card displaying pending withdrawals */}
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              {/* Total pending withdrawals */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 1, display: 'flex', justifyContent: 'space-between', fontSize: 20 }}
              >
                {data.pendingWithdrawal?.total}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              {/* Title: Pending Withdrawal */}
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Pending Withdrawal
              </Typography>

              {/* Subtitle: Number of pending withdrawals today */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mt: 10, display: 'flex', justifyContent: 'center', fontSize: 20 }}
              >
                {data.pendingWithdrawal?.today} Pending Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Card displaying company revenue */}
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              {/* Total company revenue */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 1, display: 'flex', justifyContent: 'space-between', fontSize: 20 }}
              >
                {data.company_revenue}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              {/* Title: Company Revenue Till Now */}
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Company Revenue Till Now
              </Typography>

              {/* Subtitle: Revenue amount (currently set to 0) */}
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mt: 10, display: 'flex', justifyContent: 'center', fontSize: 20 }}
              >
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          {/* Card displaying Highcharts chart */}
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              {/* Highcharts chart */}
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  ...options,
                  xAxis: { title: 'dd', categories },
                  series: [{ data: row }]
                }}
              />
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12}>
          {/* Card displaying ComposableMap */}
          <Card component='div' sx={{ position: 'relative', mb: 7, }}>
            <CardContent>
              {/* ComposableMap */}


              <ComposableMap id='dashboard-composableMap'  fill='#DDD' stroke='white' strokeWidth='1px' projectionConfig={{ scale: 150 }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) => geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)}
                </Geographies>
                {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="2" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "red",fontWeight:"bold",fontSize:"13px"}}
          >
            {name}
          </text>
        </Marker>
      ))}
              </ComposableMap>





            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
