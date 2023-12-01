import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import CommonsForm from "main/components/Commons/CommonsForm";
import { QueryClient, QueryClientProvider } from "react-query";
import commonsFixtures from "fixtures/commonsFixtures"
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import healthUpdateStrategyListFixtures from "fixtures/healthUpdateStrategyListFixtures";
import { convertToDateTimeLocalString } from "main/utils/commonsUtils";

// Next line uses technique from https://www.chakshunyu.com/blog/how-to-spy-on-a-named-import-in-jest/
import * as useBackendModule from "main/utils/useBackend";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe("CommonsForm tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const submitAction = jest.fn();

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm submitAction={submitAction}  />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Commons Name/)).toBeInTheDocument();

    [
      /Starting Balance/,
      /Cow Price/,
      /Milk Price/,
      /Starting Date/,
      /Last Date/,
      /Degradation Rate/,
      /Capacity Per User/,
      /Carrying Capacity/,
      /Show Leaderboard\?/,
      /When below capacity/,
      /When above capacity/,

    ].forEach(
      (pattern) => {
        expect(screen.getByText(pattern)).toBeInTheDocument();
      }
    );
    expect(screen.getByText(/Create/)).toBeInTheDocument();
    expect(screen.getByTestId("CommonsForm-Submit-Button")).toHaveTextContent("Create");

  });


  it("has validation errors for required fields", async () => {
    const submitAction = jest.fn();

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);


    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm submitAction={submitAction} buttonLabel="Create New Commons" />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("CommonsForm-name")).toBeInTheDocument();
    const submitButton = screen.getByTestId("CommonsForm-Submit-Button");
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByTestId("CommonsForm-Submit-Button")).toHaveTextContent("Create New Commons");

    fireEvent.change(screen.getByTestId("CommonsForm-degradationRate"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-carryingCapacity"), { target: { value: "" } });

    //Check default empty field
    fireEvent.click(submitButton);
    expect(await screen.findByText('Commons name is required')).toBeInTheDocument();
    expect(screen.getByText('Degradation rate is required')).toBeInTheDocument();
    expect(screen.getByText('Carrying capacity is required')).toBeInTheDocument();
    expect(screen.getByText('Capacity Per User is required')).toBeInTheDocument();

    //Clear Default Values
    fireEvent.change(screen.getByTestId("CommonsForm-milkPrice"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-cowPrice"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-startingBalance"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-startingDate"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("CommonsForm-lastDate"), { target: { value: "" } });
    fireEvent.click(submitButton);
    expect(await screen.findByText('Cow price is required')).toBeInTheDocument();
    expect(screen.getByText('Milk price is required')).toBeInTheDocument();
    expect(screen.getByText('Starting Balance is required')).toBeInTheDocument();
    expect(screen.getByText('Last date must be ≥ starting date')).toBeInTheDocument();

    const curr = new Date();
    const today = convertToDateTimeLocalString(curr);
    const yesterday = convertToDateTimeLocalString(new Date(curr.setDate(curr.getDate() - 1)));
    // Check that equality operation works
    fireEvent.change(screen.getByTestId("CommonsForm-lastDate"), { target: { value: today } });
    fireEvent.change(screen.getByTestId("CommonsForm-startingDate"), { target: { value: yesterday } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Last date must be ≥ starting date')).toBeInTheDocument();


    //Reset to Invalid Values
    fireEvent.change(screen.getByTestId("CommonsForm-milkPrice"), { target: { value: "-1" } });
    fireEvent.change(screen.getByTestId("CommonsForm-cowPrice"), { target: { value: "-1" } });
    fireEvent.change(screen.getByTestId("CommonsForm-startingBalance"), { target: { value: "-1" } });
    fireEvent.change(screen.getByTestId("CommonsForm-startingDate"), { target: { value: NaN } });
    fireEvent.change(screen.getByTestId("CommonsForm-lastDate"), { target: { value: NaN } });
    fireEvent.click(submitButton);

    //Await
    await screen.findByTestId('CommonsForm-milkPrice');

    [
      "CommonsForm-name",
      "CommonsForm-degradationRate",
      "CommonsForm-capacityPerUser",
      "CommonsForm-carryingCapacity",
      "CommonsForm-milkPrice",
      "CommonsForm-cowPrice",
      "CommonsForm-startingBalance",
      "CommonsForm-startingDate",
      "CommonsForm-lastDate",

    ].forEach(
      (item) => {
        const element = screen.getByTestId(item);
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("is-invalid");
      }
    );

    // check that the other testids are present

    [
      "CommonsForm-showLeaderboard",
    ].forEach(
      (testid) => {
        const element = screen.getByTestId(testid);
        expect(element).toBeInTheDocument();
      }
    );

    expect(submitAction).not.toBeCalled();
  });



  it("Check Default Values and correct styles", async () => {

    const curr = new Date();
    const today = convertToDateTimeLocalString(curr);
    const quarterLater = new Date(curr.getTime() + (70 * 24 * 60 * 60 * 1000));
    const quarterLaterString = convertToDateTimeLocalString(quarterLater);
    const values = {
      name: "", startingBalance: 10000, cowPrice: 100,
      milkPrice: 1, degradationRate: 0.001, carryingCapacity: 100, startingDate: today,
      lastDate: quarterLaterString
    };

    axiosMock
        .onGet("/api/commons/all-health-update-strategies")
        .reply(200, healthUpdateStrategyListFixtures.real);

    axiosMock
      .onGet("/api/commons/defaults")
      .reply(200, values);

    render(
        <QueryClientProvider client={new QueryClient()}>
          <Router>
            <CommonsForm  />
          </Router>
        </QueryClientProvider>
    );

    expect(await screen.findByTestId("CommonsForm-name")).toBeInTheDocument();
    [
      "name", "degradationRate", "carryingCapacity",
      "milkPrice","cowPrice","startingBalance","startingDate", 'lastDate'
    ].forEach(
        (item) => {
          const element = screen.getByTestId(`CommonsForm-${item}`);
          expect(element).toHaveValue(values[item]);
        }
    );

    // Check Style
    expect(screen.getByTestId("CommonsForm-r0")).toHaveStyle('width: 80%');
    expect(screen.getByTestId("CommonsForm-r1")).toHaveStyle('width: 80%');
    expect(screen.getByTestId("CommonsForm-r2")).toHaveStyle('width: 80%');
    expect(screen.getByTestId("CommonsForm-r3")).toHaveStyle('width: 80%');
    expect(screen.getByTestId("CommonsForm-r4")).toHaveStyle('width: 300px');
    expect(screen.getByTestId("CommonsForm-r4")).toHaveStyle('height: 50px');
    expect(screen.getByTestId("CommonsForm-r5")).toHaveStyle('width: 300px');
    expect(screen.getByTestId("CommonsForm-r5")).toHaveStyle('height: 50px');
    expect(screen.getByTestId("CommonsForm-Submit-Button")).toHaveStyle('width: 30%');
  });


  it("has validation errors for values out of range", async () => {
    const submitAction = jest.fn();

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);


    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm submitAction={submitAction} buttonLabel="Create" />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("CommonsForm-Submit-Button")).toBeInTheDocument();
    const submitButton = screen.getByTestId("CommonsForm-Submit-Button");
    expect(submitButton).toBeInTheDocument();


    fireEvent.change(screen.getByTestId("CommonsForm-startingBalance"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Starting Balance must be ≥ 0.00/i);

    fireEvent.change(screen.getByTestId("CommonsForm-cowPrice"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Cow price must be ≥ 0.01/i);

    fireEvent.change(screen.getByTestId("CommonsForm-milkPrice"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Milk price must be ≥ 0.01/i);

    fireEvent.change(screen.getByTestId("CommonsForm-degradationRate"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Degradation rate must be ≥ 0/i);

    fireEvent.change(screen.getByTestId("CommonsForm-carryingCapacity"), { target: { value: "-1" } });
    fireEvent.click(submitButton);
    await screen.findByText(/Carrying Capacity must be ≥ 1/i);


    expect(submitAction).not.toBeCalled();
  });


  it("renders correctly when an initialCommons is passed in", async () => {

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm initialCommons={commonsFixtures.threeCommons[0]} />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Id/)).toBeInTheDocument();


    expect(screen.getByTestId("CommonsForm-id")).toHaveValue(`${commonsFixtures.threeCommons[0].id}`);
    expect(screen.getByTestId("CommonsForm-name")).toHaveValue(commonsFixtures.threeCommons[0].name);
    expect(screen.getByTestId("CommonsForm-startingBalance")).toHaveValue(commonsFixtures.threeCommons[0].startingBalance);
    expect(screen.getByTestId("CommonsForm-cowPrice")).toHaveValue(commonsFixtures.threeCommons[0].cowPrice);

    expect(screen.getByTestId("aboveCapacityHealthUpdateStrategy-Noop")).toBeInTheDocument();
    expect(screen.getByTestId("belowCapacityHealthUpdateStrategy-Noop")).toBeInTheDocument();
  });

  it("renders correctly with date cut off", async () => {
    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm initialCommons={commonsFixtures.threeCommons[0]} />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Id/)).toBeInTheDocument();
    expect(screen.getByTestId("CommonsForm-startingDate")).toHaveValue(commonsFixtures.threeCommons[0].startingDate);
    expect(screen.getByTestId("CommonsForm-lastDate")).toHaveValue(commonsFixtures.threeCommons[0].lastDate);
  });

  it("renders correctly when an initialCommons is not passed in", async () => {
    const curr = new Date();
    const today = convertToDateTimeLocalString(curr);
    const values = {
      name: "", startingBalance: 10000, cowPrice: 100,
      milkPrice: 1, degradationRate: 0.001, carryingCapacity: 100, startingDate: today, lastDate: onemonthfromtoday,
      aboveCapacityHealthUpdateStrategy: "Linear", belowCapacityHealthUpdateStrategy: "Constant"
    };

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);
    
    axiosMock
      .onGet("/api/commons/defaults")
      .reply(200, values);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("CommonsForm-name")).toBeInTheDocument();
    [
      "name", "degradationRate", "carryingCapacity",
      "milkPrice","cowPrice","startingBalance","startingDate", "lastDate"
    ].forEach(
        (item) => {
          const element = screen.getByTestId(`CommonsForm-${item}`);
          expect(element).toHaveValue(values[item]);
        }
    );

    expect(await screen.findByText(/When below capacity/)).toBeInTheDocument();

    expect(screen.getByTestId("aboveCapacityHealthUpdateStrategy-Linear")).toBeInTheDocument();
    expect(screen.getByTestId("aboveCapacityHealthUpdateStrategy-Linear")).toHaveAttribute("selected");
    expect(screen.getByTestId("belowCapacityHealthUpdateStrategy-Constant")).toBeInTheDocument();
    expect(screen.getByTestId("belowCapacityHealthUpdateStrategy-Constant")).toHaveAttribute("selected");
  });

  it('use default values when initial commons not provided', async () => {
    const submitAction = jest.fn();
  
    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);
  
    axiosMock
      .onGet("/api/commons/defaults")
      .reply(200, {
        startingBalance: 500,
        cowPrice: 32,
        milkPrice: 0.5,
        degradationRate: 0.005,
        carryingCapacity: 500,
        capacityPerUser: 5,
        aboveCapacityHealthUpdateStrategy: "Linear",
        belowCapacityHealthUpdateStrategy: "Constant",
      });
  
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm submitAction={submitAction} />
        </Router>
      </QueryClientProvider>
    );
  
    fireEvent.change(screen.getByTestId("CommonsForm-startingBalance"), { target: { value: "0" } });
    fireEvent.change(screen.getByTestId("CommonsForm-cowPrice"), { target: { value: "0" } });
    fireEvent.change(screen.getByTestId("CommonsForm-milkPrice"), { target: { value: "0" } });
    fireEvent.change(screen.getByTestId("CommonsForm-degradationRate"), { target: { value: "0" } });
    fireEvent.change(screen.getByTestId("CommonsForm-carryingCapacity"), { target: { value: "0" } });
    fireEvent.change(screen.getByTestId("CommonsForm-capacityPerUser"), { target: { value: "0" } });

    // force invoke useEffect
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  
    expect(screen.getByTestId('CommonsForm-startingBalance')).toHaveValue(500);
    expect(screen.getByTestId('CommonsForm-cowPrice')).toHaveValue(32);
    expect(screen.getByTestId('CommonsForm-milkPrice')).toHaveValue(0.5);
    expect(screen.getByTestId('CommonsForm-degradationRate')).toHaveValue(0.005);
    expect(screen.getByTestId('CommonsForm-carryingCapacity')).toHaveValue(500);
    expect(screen.getByTestId('CommonsForm-capacityPerUser')).toHaveValue(5);
  });
  
  test("the correct parameters are passed to useBackend", async () => {

    axiosMock
      .onGet("/api/commons/all-health-update-strategies")
      .reply(200, healthUpdateStrategyListFixtures.real);
    
    axiosMock
      .onGet("/api/commons/defaults")
      .reply(200, commonsFixtures.defaultCommons);;

    // https://www.chakshunyu.com/blog/how-to-spy-on-a-named-import-in-jest/
    const useBackendSpy = jest.spyOn(useBackendModule, 'useBackend');

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <CommonsForm />
        </Router>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(useBackendSpy).toHaveBeenCalledWith(
        "/api/commons/all-health-update-strategies", {
        method: "GET",
        url: "/api/commons/all-health-update-strategies",
      },
      );
    });
    await waitFor(() => {
      expect(useBackendSpy).toHaveBeenCalledWith(
        "/api/commons/defaults", {
        method: "GET",
        url: "/api/commons/defaults",
      },
      );
    });
  });
});