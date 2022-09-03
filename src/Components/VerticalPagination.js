import {useState,useEffect} from 'react'
import axios from 'axios'
import {Box, Card,CardContent,Typography} from '@mui/material'
import './VerticalPagination.css'

let VerticalPagination = ()=>{
    const[data,setData] = useState([])
    const[query,setQuery] = useState('')
    const[pageNumber,setPageNumber] = useState(1)

    useEffect(()=>{
        setQuery(query)
        setPageNumber(1)
    },[query])



    let scrollHandler = async(event)=>{
        const traget = event.target;
        if (traget.scrollHeight - traget.scrollTop === traget.clientHeight) {
            setPageNumber(pageNumber+1)
            let res = await axios.get('https://openlibrary.org/search.json',{params:{
                q : query,
                page : pageNumber
                }
            }
            )
            let resData = await res.data.docs
            setData((prevData)=>{
                return [...prevData ,...resData]
            })
    }
    }

    let inputHandler = async(event)=>{
        if((event.target.value).length>2){
            setQuery(event.target.value)
            let res = await axios.get('https://openlibrary.org/search.json',{params:{
                q : query,
                page : 1
                }
            }
            )
            let resData = await res.data.docs
            setData(resData)
        }
    }
    return(
        <div>
            <input type='text' onChange={inputHandler}></input>
            <Box className='container' onScroll={scrollHandler}>
                {data.map((eachData)=>(
                    <Card style={{backgroundColor: "grey",marginTop:'20px',display:'grid',marginLeft:'50px',marginRight:'600px' }}>
                        <CardContent>
                            <Typography  variant='h5'>
                                {eachData.title}
                            </Typography>
                            <Typography>
                                {eachData.author_name}
                            </Typography>
                            <Typography>
                                {eachData.first_publish_year}
                            </Typography>
                            
                            
                        </CardContent>
                        
                    </Card>
                    
                ))}
            </Box>
        </div>
    )

}

export default VerticalPagination