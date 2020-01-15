import React from 'react';
import { Container, Button } from 'react-bootstrap'

interface State {
    problems : any,
    isLoading : boolean,
    currentPage : number
}
interface Props {}
export class App extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            problems : [],
            isLoading : false,
            currentPage : 1
        };
    }

    async loadPage(page : number) {
        if( this.state.isLoading ) {
            return;
        }
        this.setState({ isLoading : true});
        const response = await fetch(process.env.REACT_APP_API_URL + "v1/icfpc2019/problems?page=" + page);
        const data = await response.json();
        this.setState({
            isLoading : false,
            problems : data,
            currentPage : page
        });
    }

    componentDidMount() {
        this.loadPage(this.state.currentPage);
    }

    render() {
        const { isLoading, problems } = this.state;
        const next = () => {
            this.loadPage(this.state.currentPage+1);
        }
        const prev = () => {
            this.loadPage(this.state.currentPage-1);
        }

        if( isLoading ) {
            return <Container><h1>Problems</h1><p>Loading ...</p></Container>
        }
        return (
            <Container>
                <h1>Problems</h1>
                <ul>
                    {problems.map((x:any) => 
                        <li key={x.name}><a href={x.url}>{x.name}</a>: {x.description}</li>
                        )}
                </ul>
                <Button onClick={prev}>Back</Button>
                <Button onClick={next}>Next</Button>
            </Container>
        )
    }
}
