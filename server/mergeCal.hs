#!/usr/bin/env nix-shell
#!nix-shell --pure -i runghc -p "haskellPackages.ghcWithPackages (pkgs: [ pkgs.blaze-html pkgs.split pkgs.regex-tdfa pkgs.iso8601-time])"

{-# LANGUAGE OverloadedStrings #-}

-- By Rasmus Kirk
-- https://rasmuskirk.com/
-- Haskell program to merge iCalendar files and export them to html. Usage: scriptname ical-file1 ical-file2 > outputfile.html

import Prelude
import System.IO
import System.Environment
import Text.Blaze.Html5 as H hiding (main, head, map)
import qualified Text.Blaze.Html5 as H (head, map)
import Text.Blaze.Html5.Attributes as A
import Text.Blaze.Html.Renderer.Pretty
import Data.Foldable
import Data.Function
import Data.String
import Data.List.Split

import Data.Time.Clock
import Data.Time.LocalTime
import Data.Time.Calendar
import Data.Time.Calendar.WeekDate (toWeekDate)
import Data.Time.ISO8601
import Text.Regex.TDFA

type Header    = [(String, String)]
type Event     = [(String, String)]
type Events    = [Event]
type ParsedCal = (Header, Events)
type WeekDates = [Events]

main :: IO ()
main = do
  args <- getArgs
  zt <- getZonedTime
  now <- getCurrentTime
  if (length args) == 1 then do
    handle1 <- openFile (args !! 0) ReadMode
    hSetEncoding handle1 utf8_bom
    contents1 <- hGetContents handle1
    let
      cal1 = parseIcalendar contents1
      --weekDates = getWeekDates (weekRange (utctimeToISO8601 now) zt) cal1
      weekDates = getWeekDates (weekRange "20210516T075231Z" zt) cal1
    putStr (renderHtml (createSchema cal1 weekDates))
  else if (length args) == 2 then do
    handle1 <- openFile (args !! 0) ReadMode
    hSetEncoding handle1 utf8_bom
    contents1 <- hGetContents handle1

    handle2 <- openFile (args !! 1) ReadMode
    hSetEncoding handle2 utf8_bom
    contents2 <- hGetContents handle2
    let
      cal1 = parseIcalendar contents1
      cal2 = parseIcalendar contents2
      cal3 = mergeParsed cal1 cal2
      weekDates = getWeekDates (weekRange "20210516T075231Z" zt) cal3
      --weekDates = getWeekDates (weekRange (utctimeToISO8601 now) zt) cal3
    putStr (renderHtml (createSchema cal3 weekDates))

createSchema :: ParsedCal -> WeekDates -> H.Html
createSchema cal weekDates = docTypeHtml $ do
  H.head $ link ! rel "stylesheet" ! type_ "text/css" ! href "style.css"
  body $ H.div ! class_ "cal-container" $ do
    getVLines 7
    getHLines 10
    H.div ! class_ "weekday" ! A.id "time" $ do
      H.div ! class_ "title" ! A.id "time-title" $ "Time"
      H.div ! class_ "module" ! A.style "position:absolute;top:10%;" $ "08:00"
      H.div ! class_ "module" ! A.style "position:absolute;top:19%;" $ "09:00"
      H.div ! class_ "module" ! A.style "position:absolute;top:28%;" $ "10:00"
      H.div ! class_ "module" ! A.style "position:absolute;top:37%;" $ "11:00"
      H.div ! class_ "module" ! A.style "position:absolute;top:46%;" $ "12:00"
      H.div ! class_ "module" ! A.style "position:absolute;top:55%;" $ "13:00"
      H.div ! class_ "module" ! A.style "position:absolute;top:64%;" $ "14:00"
      H.div ! class_ "module" ! A.style "position:absolute;top:73%;" $ "15:00"
      H.div ! class_ "module" ! A.style "position:absolute;top:82%;" $ "16:00"
      H.div ! class_ "module" ! A.style "position:absolute;top:91%;" $ "17:00"
    H.div ! class_ "weekday" ! A.id "mon" $ do
      H.div ! class_ "title" $ "Monday"
      getModules (weekDates !! 0)
    H.div ! class_ "weekday" ! A.id "tue" $ do
      H.div ! class_ "title" $ "Tuesday"
      getModules (weekDates !! 1)
    H.div ! class_ "weekday" ! A.id "wed" $ do
      H.div ! class_ "title" $ "Wednesday"
      getModules (weekDates !! 2)
    H.div ! class_ "weekday" ! A.id "thu" $ do
      H.div ! class_ "title" $ "Thursday"
      getModules (weekDates !! 3)
    H.div ! class_ "weekday" ! A.id "fri" $ do
      H.div ! class_ "title" $ "Friday"
      getModules (weekDates !! 4)
    H.div ! class_ "weekday" ! A.id "sat" $ do
      H.div ! class_ "title" $ "Saturday"
      getModules (weekDates !! 5)
    H.div ! class_ "weekday" ! A.id "sun" $ do
      H.div ! class_ "title" $ "Sunday"
      getModules (weekDates !! 6)

getVLines :: Int -> Html
getVLines n = fold $ getVLineList n
  where
    getVLineList :: Int -> [Html]
    getVLineList n | n /= 0 = [H.div ! class_ "v-line" ! A.style (fromString("position:absolute;left:"++ show((fromIntegral n)*12.5) ++"%;")) $ mempty] ++ [getVLines (n-1)]
    getVLineList n | n == 0 = []
    getVLineList n | n  < 0 = error "Wrong input given to function 'getVLines'"

getHLines :: Int -> Html
getHLines n = fold $ getHLineList n
  where
    getHLineList :: Int -> [Html]
    getHLineList n | n /= 0 = [H.div ! class_ "h-line" ! A.style (fromString("position:absolute;top:"++ show(((fromIntegral n)*9)+10) ++"%;")) $ mempty] ++ [getHLines (n-1)]
    getHLineList n | n == 0 = []
    getHLineList n | n  < 0 = error "Wrong input given to function 'getHLines'"

getModules :: Events -> Html
getModules modules = fold $ getModuleList modules
  where
    getModuleList :: [[(String, String)]] -> [Html]
    getModuleList xs | xs == [] = []
    getModuleList xs | xs /= [] =
      let
        dtstart = case (lookup "DTSTART" (head xs)) of
          Just n  -> n
          Nothing -> error "No start date for event"
        dtend   = case (lookup "DTEND"   (head xs)) of
          Just n  -> n
          Nothing -> error "No end date for event"
        title = case (lookup "SUMMARY" (head xs)) of
          Just n -> n
          Nothing -> error "No summary for event"
        desc = case (lookup "DESCRIPTION" (head xs)) of
          Just n -> n
          Nothing -> error "No description for event"
     in [H.div ! class_ "module" ! A.style (moduleStyle (dtstart, dtend)) $ do {H.div ! class_ "modTitle" $ fromString title; H.div ! class_ (fromString desc) $ fromString desc }] ++ getModuleList (tail xs)
      where
        moduleStyle :: (String, String) -> AttributeValue
        moduleStyle timestamps = fromString ("position:absolute;top:"++ top ++"%;height:"++height++"%")
          where
            p      = 9
            top    = show ((getPercent (fst timestamps) * p) + 10)
            height = show (((getPercent (snd timestamps))-(getPercent (fst timestamps))) * p)

getPercent :: String -> Float
getPercent date =
  let
    time = take 4 (drop 9 date)
    hour = (read (take 2 time) :: Float) - 5
    min  = read (take 2 (drop 2 time)) / 60
  in hour + min

parseIcalendar :: String -> ParsedCal
parseIcalendar xs = let
  removeNewlines :: String -> String
  removeNewlines ('\r':xs) = removeNewlines xs
  removeNewlines (x:xs) = x : removeNewlines xs
  removeNewlines "" = ""

  tuplify :: [String] -> (String,String)
  tuplify [x,y] = (x,y)
  tuplify [""] = ("", "")
  tuplify xs = error ("Error: The following list is not supported by the tuplify function:\n" ++ (show xs))

  pairUp :: [(String, String)] -> ([(String, String)], [[(String, String)]])
  pairUp input = (gh input [], reverse (go input [] []))
    where
      go (a:as) bs cs = case a of ("BEGIN", "VEVENT") -> go as bs      []
                                  ("END", "VEVENT")   -> go as ((reverse cs):bs) cs
                                  (_,_)               -> go as bs      (a:cs)
      go []     bs cs = bs

      gh (a:as) bs = case a of ("BEGIN", "VCALENDAR") -> gh as bs
                               ("BEGIN", "VEVENT")    -> reverse bs
                               (_,_)                  -> gh as (a:bs)
      gh []     bs = error "Function 'pairUp' received unsupported input."
  in pairUp (map tuplify (map (splitOn ":") (splitOn "\n" (removeNewlines xs))))

mergeParsed :: ParsedCal -> ParsedCal -> ParsedCal
mergeParsed (headerX, xs) (headerY, y:ys) = mergeParsed (headerX, y:xs) (headerY, ys)
mergeParsed (headerX, xs) (headerY, [])   = (headerX, (sortParsed xs))
  where
    sortParsed :: [[(String, String)]] -> [[(String, String)]]
    sortParsed []    = []
    sortParsed(p:xs) = (sortParsed lesser) ++ [p] ++ (sortParsed greater)
      where
        test_func_lt :: [(String, String)] -> [(String, String)] -> Bool
        test_func_lt xs ys = (lookup "DTSTART" xs) <  (lookup "DTSTART" ys)
        test_func_gteq :: [(String, String)] -> [(String, String)] -> Bool
        test_func_gteq xs ys = (lookup "DTSTART" xs) >= (lookup "DTSTART" ys)

        lesser  = filter (test_func_lt   p) xs
        greater = filter (test_func_gteq p) xs

getWeekDates :: (String, String) -> ParsedCal -> WeekDates
getWeekDates (week1, week2) cal | week1 == addDaysDate week2 1 = []
getWeekDates (week1, week2) cal | week1 /= addDaysDate week2 1 = [getWeekDay (week1) cal] ++ getWeekDates (addDaysDate week1 1, week2) cal
  where
    getWeekDay :: String -> ParsedCal -> Events
    getWeekDay compareDate (header, dates) = filter dateFilter dates
      where
        dateFilter inputDates = take 8 compareDate == take 8 lookupDate
          where
            lookupDate = case lookup "DTSTART" inputDates of
              Just d  -> d
              Nothing -> ""

utctimeToISO8601 :: UTCTime -> String
utctimeToISO8601 date = reformatDate (formatISO8601 date)
  where
    -- "2021-05-13T19:04:42.42069777Z" -> "20210513T190442Z"
    reformatDate :: String -> String
    reformatDate date = filter (\c -> c/= ':' && c /= '-') ((date =~ ("[^.]*" :: String))++"Z")

parseDate :: String -> UTCTime
parseDate xs =
  let xs' = xs
              & insertString "-" 4
              & insertString "-" 7
              & insertString ":" 13
              & insertString ":" 16
              & insertString ".000000000" 19
  in case parseISO8601 xs' of
    Just time -> time
    Nothing   -> error "Error: invalid time provided to function 'parseDate'"
  where
    insertString :: String -> Int -> String -> String
    insertString c n xs = let (ys,zs) = splitAt n xs in ys ++ c ++ zs

addDaysDate :: String -> Int -> String
addDaysDate date n = init (utctimeToISO8601 (addDaysUtcTime (parseDate date) n))
  where
    addDaysUtcTime :: UTCTime -> Int -> UTCTime
    addDaysUtcTime t x = t { utctDay = (addDays (toInteger x) (utctDay t))}

weekRange :: String -> ZonedTime -> (String, String)
weekRange date zt =
  let
    lt  = zonedTimeToLocalTime zt
    day = localDay lt
    --wd  = (\(_,_,weekDay) -> weekDay) (toWeekDate day)
    wd = 7
  in (addDaysDate date (-wd+1), addDaysDate date (7-wd))
