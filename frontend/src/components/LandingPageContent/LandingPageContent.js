import React, { useState } from "react";
import "./LandingPageContent.css";

const LandingPageContent = () => {
  const [activeTab, setActiveTab] = useState("week");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="landing-page-content">
      <div className="recommended-books">
        <div className="tag-title">
          <h2>Recommended Books</h2>
        </div>
        <ul>
          <li>
            <a href="/" className="title">
              <img
                src="https://img.wattpad.com/cover/119307608-160-k828775.jpg"
                alt=""
                title=""
              />
            </a>
            <p className="dsbn">
              <a href="">The Heritage of Throne</a>
            </p>
          </li>
          <li>
            <a href="/" className="title">
              <img
                src="https://img.wattpad.com/cover/148969091-160-k543913.jpg"
                alt=""
                title=""
              />
            </a>
            <p className="dsbn">
              <a href="">FALLING for The BEAST</a>
            </p>
          </li>
          <li>
            <a href="/" className="title">
              <img
                src="https://img.wattpad.com/cover/243988896-160-k678476.jpg"
                alt=""
                title=""
              />
            </a>
            <p className="dsbn">
              <a href="">Hiraeth Airlines</a>
            </p>
          </li>
          <li>
            <a href="/" className="title">
              <img
                src="https://img.wattpad.com/cover/278065328-160-k487308.jpg"
                alt=""
                title=""
              />
            </a>
            <p className="dsbn">
              <a href="">The Proposal</a>
            </p>
          </li>
          <li>
            <a href="/" className="title">
              <img
                src="https://img.wattpad.com/cover/273783694-160-k673859.jpg"
                alt=""
                title=""
              />
            </a>
            <p className="dsbn">
              <a href="">Resign From You</a>
            </p>
          </li>
          <li>
            <a href="/" className="title">
              <img
                src="https://img.wattpad.com/cover/351815313-160-k614173.jpg"
                alt=""
                title=""
              />
            </a>
            <p className="dsbn">
              <a href="">Rebel Prince</a>
            </p>
          </li>
        </ul>
      </div>

      <div className="popular-books h-fit">
        <div className="tag-title">
          <h2>Popular Books</h2>
        </div>
        <div className="tags">
          <span
            id="week"
            onClick={() => handleTabClick("week")}
            className={activeTab === "week" ? "current" : ""}
          >
            Week
          </span>
          <span
            id="month"
            onClick={() => handleTabClick("month")}
            className={activeTab === "month" ? "current" : ""}
          >
            Month
          </span>
          <span
            id="year"
            onClick={() => handleTabClick("year")}
            className={activeTab === "year" ? "current" : ""}
          >
            Year
          </span>
        </div>
      </div>

      <div className="popular-books-list">
        <ul
          id="week"
          style={{ display: activeTab === "week" ? "block" : "none" }}
        >
          <li>
            <a href="">Book Week 1</a>
          </li>
          <li>
            <a href="">Book Week 2</a>
          </li>
          <li>
            <a href="">Book Week 3</a>
          </li>
          <li>
            <a href="">Book Week 4</a>
          </li>
          <li>
            <a href="">Book Week 5</a>
          </li>
          <li>
            <a href="">Book Week 6</a>
          </li>
          <li>
            <a href="">Book Week 7</a>
          </li>
          <li>
            <a href="">Book Week 8</a>
          </li>
          <li>
            <a href="">Book Week 9</a>
          </li>
          <li>
            <a href="">Book Week 10</a>
          </li>
        </ul>
        <ul
          id="month"
          style={{ display: activeTab === "month" ? "block" : "none" }}
        >
          <li>
            <a href="">Book Month 1</a>
          </li>
          <li>
            <a href="">Book Month 2</a>
          </li>
          <li>
            <a href="">Book Month 3</a>
          </li>
          <li>
            <a href="">Book Month 4</a>
          </li>
          <li>
            <a href="">Book Month 5</a>
          </li>
          <li>
            <a href="">Book Month 6</a>
          </li>
          <li>
            <a href="">Book Month 7</a>
          </li>
          <li>
            <a href="">Book Month 8</a>
          </li>
          <li>
            <a href="">Book Month 9</a>
          </li>
          <li>
            <a href="">Book Month 10</a>
          </li>
        </ul>
        <ul
          id="year"
          style={{ display: activeTab === "year" ? "block" : "none" }}
        >
          <li>
            <a href="">Book Year 1</a>
          </li>
          <li>
            <a href="">Book Year 2</a>
          </li>
          <li>
            <a href="">Book Year 3</a>
          </li>
          <li>
            <a href="">Book Year 4</a>
          </li>
          <li>
            <a href="">Book Year 5</a>
          </li>
          <li>
            <a href="">Book Year 6</a>
          </li>
          <li>
            <a href="">Book Year 7</a>
          </li>
          <li>
            <a href="">Book Year 8</a>
          </li>
          <li>
            <a href="">Book Year 9</a>
          </li>
          <li>
            <a href="">Book Year 10</a>
          </li>
        </ul>
      </div>

      <div className="latest-novels">
        <div className="tag-title">
          <h5>Latest Update</h5>
          <a href="">
            More {">"}
            {">"}{" "}
          </a>
        </div>
        <div className="latest-update-list m-cols">
          <div className="latest-update-novel">
            <a href="">
              <div className="pic">
                <img
                  src="https://trxs.cc/d/file/tongren/20241111/629dbed1f804f2d0a95801074188cc78.jpg"
                  alt=""
                ></img>
              </div>
              <div className="infos">
                <h3>
                  The game of all heavens, the cheater who started from Demon
                  Slayer (full version)
                </h3>
                <div className="booknews">
                  Author: Liu Shui Jian Xin
                  <label className="date">2024-11-11</label>
                </div>
                <p>
                  Introduction: One day two hundred years ago, countless huge
                  portals appeared all over the earth, and the world ushered in
                  an irresistible [Game of Fate]. Evil spirits that feed on
                  humans, giants behind high walls, the Holy Grail filled with
                  despair, and human lives became meaningless numbers in an
                  instant. But the time traveler Tong Gu discovered that these
                  worlds are not just the animation dramas in his memory, so...
                  Demon Slayer World, please let Muzan bask in the sun; One
                  Piece World, give Momonosuke and Xiaoyu a new identity; Giant
                  World,... Game of Fate, please call me a cheater. Experienced
                  worlds: [Demon Slayer] [Jujutsu] [Gantz] [One Piece] [Legend
                  of the Magic Soldier] [Hunter x Hunter: Greed Island] World in
                  progress: [One Punch Man] World to be played: [Re:0]F
                </p>
              </div>
            </a>
          </div>
          <div className="latest-update-novel">
            <a href="">
              <div className="pic">
                <img
                  src="https://trxs.cc/d/file/tongren/20241111/ce8cad16b96044e2fdefb5f7031fee84.jpg"
                  alt=""
                ></img>
              </div>
              <div className="infos">
                <h3>Dragon, choose cultural victory to make money (1-227)</h3>
                <div className="booknews">
                  Author: An interesting potato{" "}
                  <label className="date">2024-11-11</label>
                </div>
                <p>
                  Introduction: At the beginning, the red dragon Drogo just
                  wanted to make some money. He engraved runes on his yo-yo, and
                  the "Silver Dragon from the Sky" was really dazzling! The card
                  can summon illusions, and a "Blue-Eyes White Dragon" is worth
                  more than a six-ring spell scroll. Give the drow a magic
                  guitar and set off a rock music wave of "territorial
                  invasion". Dwarves and elves can sit in the same room and play
                  together, and civilians and nobles cry for the same TV series.
                  Want to ask for the Dragon Knights? The dragons rented by the
                  Knights for the promotional video are all actors under Drogo!
                  Unknowingly, this dragon alien who no longer fights and kills
                  has accumulated gold coins higher than the mountain. The
                  church claimed that he was deceiving people, but people chose
                  to stand with him. Facing the isolated and helpless centenary
                  pope, he smiled and sneered: "Wen..."
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPageContent;
