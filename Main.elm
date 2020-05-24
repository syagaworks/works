port module Main exposing (..)

import Array
import Browser
import Browser.Events as E
import Dict exposing (Dict)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Json
import Markdown



-- hogefuga
-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- PORTS


port roomInfoSender : RoomInfo -> Cmd msg


port userNameSender : String -> Cmd msg


port editingMsgSender : String -> Cmd msg


port editedMsgSender : String -> Cmd msg


port exitRoomSender : String -> Cmd msg


port publicRoomsReceiver : (List String -> msg) -> Sub msg


port editingMsgReceiver : (List EditingMsg -> msg) -> Sub msg


port editedMsgReceiver : (EditedMsg -> msg) -> Sub msg


port enterRoomReceiver : (String -> msg) -> Sub msg


port isPublicReceiver : (Bool -> msg) -> Sub msg


-- MODEL


type alias Model =
  { page : Page
  , roomID : String
  , isPublic : Bool
  , userName : String
  , publicRooms : List String
  , myMessage : String
  , editingMessage : List EditingMsg
  , editedMessage : List EditedMsg
  , hasNameInputted : Bool
  , category : Category
  }


type Page
  = Portal
  | Room


type Category
  = Home
  | Chat
  | Games


type alias RoomInfo =
  { roomID : String, isPublic : Bool }


type alias EditingMsg =
  { name : String
  , message : String
  }


type alias EditedMsg =
  { name : String
  , message : String
  , time : String
  }


init : () -> ( Model, Cmd Msg )
init _ =
  ( Model Portal "" True "" [] "" [] [] False Home
  , Cmd.none
  )



-- UPDATE


type Msg
  = RoomInfoSend
  | UserNameSend
  | EditingMsgSend String
  | EditedMsgSend
  | ExitRoomSend
  | PublicRoomsRecv (List String)
  | EditingMsgRecv (List EditingMsg)
  | EditedMsgRecv EditedMsg
  | EnterRoomRecv String
  | IsPublicRecv Bool
  | RoomIDChanged String
  | UserNameChanged String
  | RoomTypeChanged
  | GoHome
  | GoChat
  | GoGames



--type alias ListStr = List String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    RoomInfoSend ->
      ( { model
        | isPublic =
          model.isPublic
        }
      , roomInfoSender { roomID = model.roomID, isPublic = model.isPublic }
      )

    UserNameSend ->
      ( { model
        | hasNameInputted = True
        }
      , userNameSender model.userName
      )

    EditingMsgSend editingMsg ->
      ( { model
        | myMessage = editingMsg
        }
      , editingMsgSender editingMsg
      )

    EditedMsgSend ->
      ( { model
        | myMessage = ""
        }
      , editedMsgSender model.myMessage
      )

    ExitRoomSend ->
      ( { model
        | page = Portal
        , userName = ""
        , hasNameInputted = False
        , myMessage = ""
        , editingMessage = []
        , editedMessage = []
        }
      , exitRoomSender "hoge"
      )

    PublicRoomsRecv rooms ->
      ( { model
        | publicRooms = rooms
        }
      , Cmd.none
      )

    EditingMsgRecv editingMsg ->
      ( { model
        | editingMessage = editingMsg
        }
      , Cmd.none
      )

    EditedMsgRecv editedMsg ->
      ( { model
        | editedMessage = editedMsg :: model.editedMessage
        }
      , Cmd.none
      )

    EnterRoomRecv tmp ->
      ( { model
        | page = Room
        }
      , Cmd.none
      )

    IsPublicRecv isPublic ->
      ( { model
        | isPublic = isPublic
        }
      , Cmd.none
      )

    RoomIDChanged roomID ->
      ( { model
        | roomID = roomID
        }
      , Cmd.none
      )

    RoomTypeChanged ->
      ( { model
        | isPublic = not model.isPublic
        }
      , Cmd.none
      )

    UserNameChanged userName ->
      ( { model
        | userName = userName
        }
      , Cmd.none
      )

    GoHome ->
      ( { model
        | category = Home
        }
      , Cmd.none
      )

    GoChat ->
      ( { model
        | category = Chat
        }
      , Cmd.none
      )

    GoGames ->
      ( { model
        | category = Games
        }
      , Cmd.none
      )

-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.batch
    [ publicRoomsReceiver PublicRoomsRecv
    , editingMsgReceiver EditingMsgRecv
    , editedMsgReceiver EditedMsgRecv
    , enterRoomReceiver EnterRoomRecv
    , isPublicReceiver IsPublicRecv
    ]



-- VIEW


view : Model -> Html Msg
view model =
  Element.layout [] <| myHeaderBody model

myHeaderBody : Model -> Element Msg
myHeaderBody model =
  column
    [Element.width fill
    ,Element.height fill
    , Background.color (rgb255 0 0 0)
    ]
    [ myHeader model
    , myRowOfStuff model
    ]

myHeader :model ->Element Msg
myHeader model =
  row
    [Element.width fill
    ,Element.height <| px 40
    ,padding 5
    , Background.color (rgb255 0 0 0)
    ]
    [ el
      [Font.color (rgb255 94 103 107)
      , alignLeft
      ]
     (Element.text "   syaga works")
    ]

myRowOfStuff : Model -> Element Msg
myRowOfStuff model =
  row
    [ Element.width fill
    , Element.height fill
    , centerY
    , spacing 30
    , padding 10
    , Background.color (rgb255 0 0 0)
    ]
    [ mySideBar model
    , myBody model
    ]


mySideBar : Model -> Element Msg
mySideBar model =
  column
    [ Element.width <| px 100
    , Element.height fill
    , alignTop
    , spacing 5
    , padding 5
    , Background.gradient
      { angle = 3 * pi / 4
      , steps = [ rgb255 240 0 245, rgb255 0 240 245 ]
      }
    ]
    [ el [ Events.onClick GoHome ] <| myElement <| Element.text "HOME"
    , el [ Events.onClick GoGames ] <| myElement <| Element.text "GAMES"
    , el [ Events.onClick GoChat ] <| myElement <| Element.text "CHAT"
    ]


myElement : Element Msg -> Element Msg
myElement msg =
  el
    [ Background.color (rgb255 0 0 0)
    , Font.color (rgb255 255 255 255)
    , Border.rounded 3
    , padding 30
    , alignRight
    ]
    msg


myBody : Model -> Element Msg
myBody model =
  case model.category of
    Home ->
      column
        [ Background.color (rgb255 255 255 255)
        , Element.width fill
        , Element.height fill
        ]
        [ Element.text "Under Construction." ]

    Games ->
      column
        [ Background.color (rgb255 255 255 255)
        , Element.width fill
        , Element.height fill
        ]
        [ Element.text "Games"
        , link []
            { url = "https://syagaworks.github.io/works/siritori"
            , label = Element.text "三文字しりとり(2020/05)"
            }
        , link []
            { url = "https://syagaworks.github.io/works/LMA.htm"
            , label = Element.text "Leave Me Alone(2018/11)"
            }
        , link []
            { url = "https://syagaworks.github.io/works/s2.htm"
            , label = Element.text "smart shopping(2018/10)"
            }
        , link []
            { url = "https://syagaworks.github.io/works/c2.htm"
            , label = Element.text "c2(2016/04)"
            }
         ]

    Chat ->
      case model.page of
        Portal ->
          column
            [ Background.color (rgb255 255 255 255)
            , Element.width fill
            , Element.height fill
            ]
            [ html <|
              div []
                [ headerHtml
                , button [ Html.Events.onClick ExitRoomSend ] [ Html.text "Exit" ]
                , div []
                  [ input
                    [ placeholder "room ID + Enter"
                    , onInput RoomIDChanged
                    , onEnter RoomInfoSend
                    ]
                    []
                  ]
                , div []
                  [ Html.text "The room will be"
                  , button [ Html.Events.onClick RoomTypeChanged ]
                    [ Html.text
                      (if model.isPublic then
                        "public"

                       else
                        "private"
                      )
                    ]
                  ]
                , h3 [] [ Html.text "Public rooms" ]
                , ul [] (List.map viewRooms model.publicRooms)
                ]
            ]

        Room ->
          column
            [ Background.color (rgb255 255 255 255)
            , Element.width fill
            , Element.height fill
            ]
            [ html <|
              div []
                [ button [ onClick ExitRoomSend ] [ Html.text "Exit" ]
                , p []
                  [ Html.text
                    (if model.isPublic then
                      "public"

                     else
                      "private"
                    )
                  ]
                , div []
                  [ input
                    [ placeholder "Your Name + Enter"
                    , value model.userName
                    , onInput UserNameChanged
                    , onEnter UserNameSend
                    , disabled
                      (if model.hasNameInputted then
                        True

                       else
                        False
                      )
                    ]
                    []
                  ]
                , div []
                  [ input
                    [ placeholder "message + Enter"
                    , value model.myMessage
                    , onInput EditingMsgSend
                    , onEnter EditedMsgSend
                    , hidden
                      (if model.hasNameInputted then
                        False

                       else
                        True
                      )
                    ]
                    []
                  ]
                , ul [] (List.map viewEditingMsg model.editingMessage)
                , ul [] (List.map viewEditedMsg model.editedMessage)
                ]
            ]


viewRooms : String -> Html msg
viewRooms publicRoom =
  li [] [ Html.text publicRoom ]


viewEditingMsg : EditingMsg -> Html msg
viewEditingMsg msg =
  li [] [ Html.text (msg.name ++ ":" ++ msg.message) ]


viewEditedMsg : EditedMsg -> Html msg
viewEditedMsg msg =
  li [] [ Html.text (msg.name ++ ":" ++ msg.message ++ "(" ++ msg.time ++ ")") ]


onEnter : Msg -> Html.Attribute Msg
onEnter msg =
  let
    isEnter code =
      if code == 13 then
        Json.succeed msg

      else
        Json.fail "not ENTER"
  in
  on "keydown" (Json.andThen isEnter keyCode)



-- CONSTATNTS


headerHtml : Html msg
headerHtml =
  Markdown.toHtml [ class "content" ] """

# Chat *Allegro*(β)

### About
- A simple chat app.
- Your input will be sent to a server on each key stroke. This means your message will be represented to other participant(s) in the chatting room "in realtime".
- You can start a new chatting room or join an existing room by inputting room ID in a textbox below.
- If you start a new room as **public**, the room ID will be listed below and open to everyone.
- If the room is **private**, only those who know the room ID of that room can participate.
 - (\\* Please note that this app is in beta. Thus, **You may well refrain from dumping any confidential contents here.**)

"""
