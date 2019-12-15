import React, { Component } from "react";
import "./App.css";
import axios from 'axios';

class App extends Component {
  state = {
    rmShow: [],
    selectedVal: '',
    yrs: 2,
    selectedCheckboxes: [],
    emtyStr: '',
    selectedCheckboxesName: [],
    humanCheck: false,
    mythologCheck: false,
    otherSpeciesCheck: false,
    maleCheck: false,
    femaleCheck: false,
    unknownCheck: false,
    earthCheck: false,
    nuptia4Check: false,
    otherOrigiCheck: false
  };
  componentDidMount() {
    axios.get('https://rickandmortyapi.com/api/character/').then((res) => {
      this.setState({ rmShow: res.data.results, defaultData: res.data.results });
    });
  }

  selectChangeHandler(e, rmShowArr) {
    let updateState = [...rmShowArr];
    if (e.target.value === 'descending') {
      updateState.sort((a, b) => {
        return b.id - a.id;
      });
    } else {
      updateState.sort((a, b) => {
        return a.id - b.id;
      });
    }
    this.setState(
      {
        rmShow: updateState,
        selectedVal: e.target.value
      }
    );
  };
  arr = [];
  updateShow = (e, filteredName, defaultState) => {
    this.setState({ selectedVal: '' })
    if (e.target.checked) {
      const currState = [...defaultState.defaultData];
      let newState = currState.filter(state => {
        return state.gender === e.target.name || state.species === e.target.name || state.origin.name === e.target.name;
      }
      );
      this.arr.push(filteredName);
      if (newState.length) {
        this.setState(prevState => ({
          rmShow: prevState.selectedCheckboxes.length >= 1 && prevState.rmShow.length <= prevState.defaultData.length ? [...newState, ...prevState.selectedCheckboxes] : newState,
          selectedCheckboxes: [...newState, ...prevState.selectedCheckboxes],
          selectedCheckboxesName: this.arr
        }));
        this.setState({ emtyStr: '' });
      }
      else if (!newState.length && !this.state.selectedCheckboxes.length) {
        this.setState({ emtyStr: 'empty' });
      }
    } else {
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i] === e.target.name || this.arr[i] === filteredName) {
          this.arr.splice(i, 1);
        }
      }
      this.setState({ emtyStr: '' });
      if (this.state.rmShow.length === 1) {
        this.setState({ rmShow: defaultState.defaultData, selectedCheckboxes: [] });
      } else {
        this.setState(prevState => ({
          rmShow: defaultState.defaultData,
          selectedCheckboxes: [],
          selectedCheckboxesName: this.arr
        }));
      }
    }
    if (filteredName === 'Human') {
      this.setState({ humanCheck: !this.state.humanCheck });
    }
    if (filteredName === 'Mytholog') {
      this.setState({ mythologCheck: !this.state.mythologCheck });
    }
    if (filteredName === 'Other Species...') {
      this.setState({ otherSpeciesCheck: !this.state.otherSpeciesCheck });
    }
    if (filteredName === 'Male') {
      this.setState({ maleCheck: !this.state.maleCheck });
    }
    if (filteredName === 'Female') {
      this.setState({ femaleCheck: !this.state.femaleCheck });
    }
    if (filteredName === 'unknown') {
      this.setState({ unknownCheck: !this.state.unknownCheck });
    }
    if (filteredName === 'Earth') {
      this.setState({ earthCheck: !this.state.earthCheck });
    }
    if (filteredName === 'Nuptia 4') {
      this.setState({ nuptia4Check: !this.state.nuptia4Check });
    }
    if (filteredName === 'Other Origins...') {
      this.setState({ otherOrigiCheck: !this.state.otherOrigiCheck });
    }
  };

  render() {
    console.log("selectedCheckboxesName", this.state.selectedCheckboxesName)
    let rmDisplay = null;
    let filterDiv = null;
    if (this.state.selectedCheckboxesName.length) {
      filterDiv = this.state.selectedCheckboxesName.map((filterName, ind) => {
        return (<span key={ind}
          style={
            {
              backgroundColor: 'Gray',
              color: 'white', display: 'inline-block',
              width: '20%',
              height: '25px',
              textAlign: 'center',
              borderRadius: '5px',
              marginLeft: '10px',
              marginBottom: '5px'
            }}>
          <span>
            {filterName}
          </span>
          <span checked={false}
            onClick={(e) => this.updateShow(e, filterName, this.state)}
            style={{ marginLeft: '10px', cursor: 'pointer' }}>X</span>
        </span>);
      });
    }
    if (this.state.emtyStr === 'empty') {
      rmDisplay = (<h3 style={{ color: 'red' }}>No Results Found</h3>);
    }
    if (this.state.rmShow.length && this.state.emtyStr !== 'empty') {
      rmDisplay = this.state.rmShow.map((show) => {
        return (<div className="card col-3" style={{ backgroundColor: 'lightgray', marginBottom: '10px' }} key={show.id}>
          <div className="card-body" style={{ padding: '0px' }}>
            <img src={show.image} alt="" style={{ width: '100%', marginTop: '10px' }} />
            <div style={{
              backgroundColor: 'darkgray',
              marginBottom: '10px',
              paddingLeft: '10px',
              color: 'white'
            }}>
              <span>{show.name}</span>
              <div>id: {show.id} - created {this.state.yrs} years ago</div>
            </div>
            <div>
              <ul style={{ padding: '0px' }}>
                <li style={{ listStyleType: 'none', color: 'darkgray' }}><span>STATUS</span><span style={{ float: 'right', color: 'darkorange' }}>{show.status}</span></li>
                <li style={{ listStyleType: 'none', color: 'darkgray' }}><span>SPECIES</span><span style={{ float: 'right', color: 'darkorange' }}>{show.species}</span></li>
                <li style={{ listStyleType: 'none', color: 'darkgray' }}><span>GENDER</span><span style={{ float: 'right', color: 'darkorange' }}>{show.gender}</span></li>
                <li style={{ listStyleType: 'none', color: 'darkgray' }}><span>ORIGIN</span><span style={{ float: 'right', color: 'darkorange' }}>{show.origin.name}</span></li>
                <li style={{ listStyleType: 'none', color: 'darkgray' }}><span>LAST LOCATION</span><span style={{ float: 'right', color: 'darkorange' }}>{show.location.name}</span></li>
              </ul>
            </div>
          </div>
        </div>);
      });
    }
    return (
      <div className="container">
        <h6>Filters</h6>
        <div className="row">
          <div className="card" style={{ height: '100%' }}>
            <article className="card-group-item">
              <header className="card-header">
                <h6 className="title">Species </h6>
              </header>
              <div className="filter-content">
                <div className="card-body">
                  <form>
                    <label className="form-check">
                      <input className="form-check-input" name="Human" type="checkbox" checked={this.state.humanCheck} value={this.state.humanCheck} onChange={(e) => this.updateShow(e, 'Human', this.state)} />
                      <span className="form-check-label">
                        Human
				              </span>
                    </label>
                    <label className="form-check">
                      <input className="form-check-input" name="Mytholog" type="checkbox" checked={this.state.mythologCheck} value={this.state.mythologCheck} onChange={(e) => this.updateShow(e, 'Mytholog', this.state)} />
                      <span className="form-check-label">
                        Mytholog
				              </span>
                    </label>
                    <label className="form-check">
                      <input className="form-check-input" name="Other Species..." type="checkbox" checked={this.state.otherSpeciesCheck} value={this.state.otherSpeciesCheck} onChange={(e) => this.updateShow(e, 'Other Species...', this.state)} />
                      <span className="form-check-label">
                        Other Species...
				              </span>
                    </label>
                  </form>
                </div>
              </div>
            </article>
            <article className="card-group-item">
              <header className="card-header">
                <h6 className="title">Gender </h6>
              </header>
              <div className="filter-content">
                <div className="card-body">
                  <form>
                    <label className="form-check">
                      <input className="form-check-input" name="Male" type="checkbox" checked={this.state.maleCheck} value={this.state.maleCheck} onChange={(e) => this.updateShow(e, 'Male', this.state)} />
                      <span className="form-check-label">
                        Male
				              </span>
                    </label>
                    <label className="form-check">
                      <input className="form-check-input" name="Female" type="checkbox" checked={this.state.femaleCheck} value={this.state.femaleCheck} onChange={(e) => this.updateShow(e, 'Female', this.state)} />
                      <span className="form-check-label">
                        Female
				              </span>
                    </label>
                  </form>
                </div>
              </div>
            </article>
            <article className="card-group-item">
              <header className="card-header">
                <h6 className="title">Origin </h6>
              </header>
              <div className="filter-content">
                <div className="card-body">
                  <form>
                    <label className="form-check">
                      <input className="form-check-input" name="unknown" type="checkbox" checked={this.state.unknownCheck} value={this.state.unknownCheck} onChange={(e) => this.updateShow(e, 'unknown', this.state)} />
                      <span className="form-check-label">
                        Unknown
				              </span>
                    </label>
                    <label className="form-check">
                      <input className="form-check-input" name="Post-Apocalyptic Earth" type="checkbox" checked={this.state.earthCheck} value={this.state.earthCheck} onChange={(e) => this.updateShow(e, 'Earth', this.state)} />
                      <span className="form-check-label">
                        Post-Apocalyptic Earth
				              </span>
                    </label>
                    <label className="form-check">
                      <input className="form-check-input" name="Nuptia 4" type="checkbox" value={this.state.nuptia4Check} checked={this.state.nuptia4Check} onChange={(e) => this.updateShow(e, 'Nuptia 4', this.state)} />
                      <span className="form-check-label">
                        Nuptia 4
				              </span>
                    </label>
                    <label className="form-check">
                      <input className="form-check-input" name="Other Origins..." type="checkbox" checked={this.state.otherOrigiCheck} value={this.state.otherOrigiCheck} onChange={(e) => this.updateShow(e, 'Other Origins...', this.state)} />
                      <span className="form-check-label">
                        Other Origins...
				              </span>
                    </label>
                  </form>
                </div>
              </div>
            </article>
          </div>
          <div className="col-9" style={{ marginLeft: '30px' }}>
            <div>
              <h6>Selected Filters</h6>
              <div>
                {filterDiv}
              </div>
            </div>
            <div>
              <select style={{ float: 'right' }}
                onChange={(e) => this.selectChangeHandler(e, this.state.rmShow)}
                value={this.state.selectedVal}>
                <option value="">Sort by ID</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
              <div className="row" style={{ marginTop: '20px', float: 'left' }}>
                {rmDisplay}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
