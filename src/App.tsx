/* tslint:disable */
import { Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Done, EuroSymbol, PowerSettingsNew, Replay } from '@material-ui/icons';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
// import Dropzone from 'react-dropzone'
// import Loader from 'react-loader-spinner'
import './App.css';
// import FirstComponent from './components/FirstComponent';
// import SecondComponent from './components/SecondComponent';

// interface IState {
//   results: any,
//   error: any,
//   base: any
// }

export default class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props)

    this.getData = this.getData.bind(this);
    this.setBaseRate = this.setBaseRate.bind(this);
    this.handleBaseChange = this.handleBaseChange.bind(this);
    this.handleBaseToChange = this.handleBaseToChange.bind(this);
    this.handleAmountchange = this.handleAmountchange.bind(this);
    this.convert = this.convert.bind(this);
    this.closeResult = this.closeResult.bind(this);

    this.state = {
      results: [],
      error: '',
      base: '',
      baseTo: '',
      show: false,
      baseflag: '',
      baseToFlag: '',
      amount: '',
      newValue: 0,
      rates: [],
      rateTo: 0,
      rateFrom: 0,
      convert: false,
      reset: false,
      fielddisable: false,
      convertMessage: 'I want to convert',
      hide: false,
      showConversion: false,
      showresult: 'disabled'
    }
  }


  public getData() {

    if (this.state.reset) {

      this.setState({
        amount: '',
        baseTo: '',
        baseToFlag: false,
        reset: false,
        fielddisable: false,
        convertMessage: 'I want to convert',
        // hide: false
        showConversion: false
      })

    }


    const accesskey = 'df65412fe75565ab7680803e2b80e50b';

    fetch('http://data.fixer.io/api/symbols?access_key=' + accesskey, {
      method: 'GET'
    })
      .then(data => data.json())
      .then(data => {
        this.setState({
          results: data.symbols,
          show: true,
          hide: true
        })
      })

    fetch('http://data.fixer.io/api/latest?access_key=' + accesskey, {
      method: 'GET'
    })
      .then(data => data.json())
      .then(data => {
        this.setState({
          rates: data.rates,
        })
      })


    // const flags = Object.keys(this.state.results).map((key) => (
    //   flags.key1 = ("https://www.countryflags.io/ " + key + "/flat/16.png")
    // ));
    // this.setState({flag : flags });
  }

  public convert(e: any) {
    e.preventDefault();
    if (this.state.baseTo && this.state.amount) {
      for (var key in this.state.rates) {
        if (key === this.state.baseTo) {
          this.setState({
            ...this.state.rateTo,
            rateTo: this.state.rates[key]
          })
        }
      }


      this.setState({
        error: '',
        convert: true,
        reset: true,
        fielddisable: true,
        convertMessage: 'You converted',
        hide: false,
        showConversion: true
      })
    }
    else {
      this.setState({ error: 'Please complete both fields!' })
    }
  }

  public setBaseRate() {
    for (var key in this.state.rates) {
      if (key === this.state.base) {
        this.setState({
          rateFrom: this.state.rates[key]
        })
      }
    }
  }

  public closeResult() {

    this.setState({
      showConversion: false
    })

  }

  public handleAmountchange = (event: any) => {
    this.setState({
      amount: event.target.value
    })
  }

  public handleBaseChange = (event: any, results: any) => {
    this.setState({
      base: event.target.value,
      baseflag: "https://www.countryflags.io/" + event.target.value.toString().toLowerCase().slice(0, 2) + "/flat/32.png",
      newValue: results
    });
    this.setBaseRate();
  }

  public handleBaseToChange = (event: any) => {
    event.preventDefault();
    this.setState({ baseTo: event.target.value, baseToFlag: "https://www.countryflags.io/" + event.target.value.toString().toLowerCase().slice(0, 2) + "/flat/32.png" });

    // for (var key in this.state.rates) {
    //   if (key === this.state.baseTo) {
    //     this.setState({
    //       rateTo: this.state.rates[key]
    //     })
    //   }
    // }
  }

  public render() {
    // const { results } = this.state.results;

    return (
      <div className="container-fluid">
        <Grid>
          <Row style={{ display: 'flex', justifyContent: 'left', alignContent: 'left' }}>
            <h1 className="title">uro<EuroSymbol /><span style={{ fontSize: '20px', fontStyle: 'italic', fontWeight: 'lighter' }}>onverter</span></h1>
            {/* {console.log(this.state.baseTo)}
            {console.log(this.state.rateTo)} */}
          </Row>
          {!this.state.hide ?
            <Row style={{ display: 'flex', justifyContent: 'left', alignContent: 'left', marginTop: '2%' }}>
              {/* <Button bsStyle="primary" onClick={this.getData}><AttachMoney /></Button> */}
              <h2 className="getMoney" style={{paddingLeft: '1%'}}>uro.</h2>
              <div onClick={this.getData}>
                {!this.state.hide ?
                  <Button variant="fab" color="primary" size="medium" style={{ bottom: '5px' }}>
                    {!this.state.reset ? <PowerSettingsNew /> : <Replay />}
                  </Button>
                  : <span></span>}
              </div>
            </Row>
            :
            <Row style={{ display: 'flex', justifyContent: 'left', alignContent: 'left' }}>
              <h2 className="getMoney" style={{paddingLeft: '1%'}}>uro<span className="convert">.convert()</span></h2>
            </Row>
          }
          {this.state.show ?
            <div className="container-fluid">

              <Row className="flex-row">
                <Col sm={3} md={3} lg={3}>
                  {/* <h6>
                    <Label>I want to convert</Label>
                  </h6> */}
                  {/* <FormControl type="text" placeholder="Amount"/> */}
                  <FormControl fullWidth={true}>
                    <InputLabel>{this.state.convertMessage}</InputLabel>
                    <Input
                      placeholder="Amount"
                      value={this.state.amount}
                      disabled={this.state.fielddisable}
                      id="adornment-amount"
                      type="number"
                      style={{ fontSize: '1.6rem' }}
                      onChange={this.handleAmountchange}
                      endAdornment={
                        <InputAdornment position="start">
                          <EuroSymbol />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Col>
                {/* <Col sm={4} md={4} lg={3}>
                  <FormControl fullWidth={true} placeholder="select">
                    <InputLabel>From</InputLabel>
                    <Select
                      value={this.state.base}
                      onChange={this.handleBaseChange.bind(results)}
                      disabled={this.state.fielddisable}
                      style={{ fontSize: '1.6rem' }}>
                      {Object.keys(this.state.results).map(key => (
                        <MenuItem value={key}>
                          ({key}) {`${this.state.results[key]}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col> */}
                <Col sm={4} md={4} lg={3} className="lol">
                  {/* <h6>
                    <Label>To</Label>
                  </h6> */}
                  <FormControl fullWidth={true} placeholder="select">
                    <InputLabel className="inputLabel">To</InputLabel>
                    <Select
                      value={this.state.baseTo}
                      onChange={this.handleBaseToChange}
                      disabled={this.state.fielddisable}
                      style={{ fontSize: '1.6rem' }}
                      startAdornment={
                          <img src={this.state.baseToFlag} style={{paddingRight: '2px'}}/>
                      }
                    >
                      {Object.keys(this.state.results).map(key => (
                        // <li>
                        //   <a href={`#${this.state.results[key]}`} key={key}>
                        //   {key}
                        //   </a>
                        // </li>
                        <MenuItem value={key}>({key}) {`${this.state.results[key]}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col sm={3} md={4} lg={3}>
                  <div onClick={this.convert} style={{paddingLeft: '2%'}}>
                    <Button
                      variant="fab"
                      color="primary"
                      size="medium"
                      disabled={this.state.fielddisable}
                    >
                      <Done />
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
            // : <h2 className="convert" style={{ display: 'flex', justifyContent: 'center' }}>show me the money.</h2>}
            : <span></span>}
          {/* <Row style={{ display: 'flex', justifyContent: 'center' }}>
            {this.state.base}
            <img src={this.state.baseflag} />
            {this.state.baseTo}
            {this.state.baseToFlag ?
              <img src={this.state.baseToFlag} /> :
              <span></span>
            }
            {this.state.amount}
          </Row> */}
          <Row>
            {this.state.error ?
              <h2 className="getMoney" style={{ marginTop: '5%', paddingLeft: '1%' }}>uro<span className="convert">.error('{this.state.error}')</span></h2>
              :
              <span></span>
            }
          </Row>
          {this.state.showConversion ?
            <Grid style={{ marginTop: '5%' }}>
              <Row style={{marginBottom: '5%'}}>
                {/* <Col sm={3} md={3} lg={2} style={{ margin: '0', padding: '0'}}> */}
                <div style={{ display: 'inline-block' }}>
                  <h2 className="getMoney" style={{ marginTop: '5%', paddingLeft: '1%'}}>uro<span className="convert">.results()</span></h2>
                </div>
                {/* <div onClick={this.closeResult} style={{ display: 'inline-block', bottom: '5px' }}>
                      <IconButton>
                        <Close />
                      </IconButton>
                  </div> */}
                {/* <h2 className="getMoney" style={{marginTop: '5%', display: 'inline-block' }}><span className="convert">)</span></h2> */}
                {/* </Col> */}
                {/* <Col sm={2} md={2} lg={2} style={{ margin: '0', padding: '0'}}>
                    <div onClick={this.closeResult} style={{ display: 'flex', justifyContent: 'right', alignContent: 'right' }}>  
                        <IconButton>
                          <Close />
                        </IconButton>
                    </div>
                </Col> */}
              </Row>

              <Row style={{paddingLeft: '10%'}}>
                <Col sm={4} md={4} lg={2} style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                  <p style={{fontFamily: 'Nexa', fontSize: '40px'}}>{this.state.amount}<EuroSymbol style={{fontSize: '20px'}}/></p>
                </Col>
                <Col sm={2} md={2} lg={1} style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                  <p style={{fontSize: '40px'}}>=</p>
                </Col>
                <Col sm={4} md={4} lg={4} style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                  {/* <img src={this.state.baseToFlag} style={{display: 'inline-block'}} /> */}
                  <p style={{display: 'inline-block', fontFamily: 'Nexa', fontSize: '40px'}}>{this.state.rateTo * this.state.amount} {this.state.baseTo}</p>
                </Col>
                {/* {this.state.rateTo * this.state.amount} */}
              </Row>
            </Grid>
            :
            <span></span>
          }
        </Grid>
      </div>
    );
  }
}
