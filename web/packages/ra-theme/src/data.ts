import { Data, PostTypeData, PostTypeEntity } from "@frontity/source/types";

export interface MemberData extends PostTypeData {
  /**
   * Member type slug.
   */
  type: "member";

  /**
   * Identify a member.
   */
  isMember: true;
}

export interface MemberEntity extends PostTypeEntity {
  acf: {
    /**
     * Member name.
     */
    name: string;

    /**
     * Member role.
     */
    role: string;

    /**
     * Member image (id).
     */
    image?: number;

    /**
     * Member description.
     */
    description?: string;
  };
}

export function isMember(data: Data): data is MemberData {
  return (data as MemberData).isMember === true;
}

export interface ShowData extends PostTypeData {
  /**
   * Show type slug.
   */
  type: "show";

  /**
   * Identify a show.
   */
  isShow: true;
}

export interface ShowEntity extends PostTypeEntity {
  acf: {
    /**
     * Show title.
     */
    title: string;

    /**
     * Show hosts (members ids).
     */
    hosts: number[];

    /**
     * Show image (id).
     */
    image?: number;

    /**
     * Member description.
     */
    description?: string;
  };
}

export function isShow(data: Data): data is ShowData {
  return (data as ShowData).isShow === true;
}

export interface EventData extends PostTypeData {
  /**
   * Event type slug.
   */
  type: "event";

  /**
   * Identify an event.
   */
  isEvent: true;
}

export type DayOfTheWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type EventType = "live" | "replay";

export interface EventEntity extends PostTypeEntity {
  acf: {
    /**
     * Show that this event is an instance of (show id).
     */
    show: number;

    /**
     * Event day (day of the week).
     */
    day: DayOfTheWeek;

    /**
     * Event start time (hour of the day in HH:MM:SS format).
     */
    start_time: string;

    /**
     * Event end time (hour of the day in HH:MM:SS format).
     */
    end_time: string;

    /**
     * Event type.
     */
    type: EventType;
  };
}

export function isEvent(data: Data): data is EventData {
  return (data as EventData).isEvent === true;
}

export interface AlbumData extends PostTypeData {
  /**
   * Album type slug.
   */
  type: "album";

  /**
   * Identify an album.
   */
  isAlbum: true;
}

export interface AlbumEntity extends PostTypeEntity {
  acf: {
    /**
     * Album artist.
     */
    artist: string;

    /**
     * Album title.
     */
    title: string;

    /**
     * Album image (id).
     */
    image?: number;

    /**
     * Album description.
     */
    description?: string;
  };
}

export function isAlbum(data: Data): data is AlbumData {
  return (data as AlbumData).isAlbum === true;
}

export interface RecordingData extends PostTypeData {
  /**
   * Recording type slug.
   */
  type: "recording";

  /**
   * Identify a recording.
   */
  isRecording: true;
}

export interface RecordingEntity extends PostTypeEntity {
  acf: {
    /**
     * Recording title.
     */
    title: string;

    /**
     * Recording file (id).
     */
    file: number;

    /**
     * Recording image (id).
     */
    image?: number;

    /**
     * Recording description.
     */
    description?: string;
  };
}

export function isRecording(data: Data): data is RecordingData {
  return (data as RecordingData).isRecording === true;
}

export interface InfoTileData extends PostTypeData {
  /**
   * Info tile type slug.
   */
  type: "info";

  /**
   * Identify an info tile.
   */
  isInfo: true;
}

export interface InfoTileEntity extends PostTypeEntity {
  acf: {
    /**
     * Info tile title.
     */
    title: string;

    /**
     * Info tile link (user-side url).
     */
    link: string;

    /**
     * Info tile image (id).
     */
    image?: number;
  };
}

export function isInfoTile(data: Data): data is InfoTileData {
  return (data as InfoTileData).isInfo === true;
}