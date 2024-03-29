import { motion } from "framer-motion";
import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { EventArchiveData, EventEntity } from "../../data";
import EventDay from "./event-day";

/**
 * Props received by the {@link EventList} component.
 */
interface ListProps {
  data: EventArchiveData;
  when?: boolean;
}

/**
 * Component that renders the list of events,
 * passed as an {@link EventArchiveData} object.
 *
 * @param props - Object of type {@link ListProps}.
 * @returns React component.
 */
function EventList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  const eventsPerDay = data.items.reduce(
    (acc, { type, id }) => {
      const item = state.source[type][id] as EventEntity;
      const day = item.acf.day;
      if (!acc[day]) acc[day] = [];
      acc[day].push(item);
      return acc;
    },
    {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
  );

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Title>
        <h1>Ramówka</h1>
      </Title>

      <Days>
        <EventDay data={eventsPerDay.monday} onHome={false} day={"monday"} />
        <EventDay data={eventsPerDay.tuesday} onHome={false} day={"tuesday"} />
        <EventDay
          data={eventsPerDay.wednesday}
          onHome={false}
          day={"wednesday"}
        />
        <EventDay
          data={eventsPerDay.thursday}
          onHome={false}
          day={"thursday"}
        />
        <EventDay data={eventsPerDay.friday} onHome={false} day={"friday"} />
        <EventDay
          data={eventsPerDay.saturday}
          onHome={false}
          day={"saturday"}
        />
        <EventDay data={eventsPerDay.sunday} onHome={false} day={"sunday"} />
      </Days>
    </Container>
  );
}

export default connect(EventList);

const Container = styled(motion.section)`
  width: 100%;
  max-width: 1200px;
  margin: 20px 0 0 0;
  margin-left: auto;
  margin-right: auto;

  & > div {
    padding-left: 30px;
    padding-right: 30px;
  }

  @media (max-width: 750px) {
    & > div {
      padding: 0;
    }
  }
`;

const Title = styled.div`
  & > h1 {
    color: #6aba9c;
    background-color: #30241a;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 15px;
    font-weight: lighter;
  }
`;

const Days = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
