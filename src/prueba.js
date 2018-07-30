import React from 'react';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinkHorizontal } from '@vx/shape';
import { hierarchy } from 'd3-hierarchy';
import { LinearGradient } from '@vx/gradient';

const raw = {
  "name": "START",
  "children": [
    {
      "name": "Trivia",
      "children": [
        {
          "name": "Var, cond & loops",
          "children": [{
            "name": "learnyouhtml"
          }]
        },
        {
          "name": "&#9786;",
          "children": [{
            "name": "Cifrado",
            "children": [
              {
                "name": "Tarjeta",
                "children": [{
                  "name": "Array & objects",
                  "children": [{
                    "name": "javascripting",
                    "children": [{
                      "name": "git-it"
                    }]
                  }]
                }]
              },
              {
                "name": "Data Dashboard",
                "children": [
                  {
                    "name": "Tic tac toe",
                    "children": [{
                      "name": "Trello",
                      "children": [{
                        "name": "Twitter"
                      }]
                    }]
                  },
                  {
                    "name": "Red Social",
                    "children": [
                      {
                        "name": "&#9786;",
                        "children": [
                          {
                            "name": "Burger Queen"
                          },
                          {
                            "name": "Markdown"
                          },
                          {
                            "name": "Server JS"
                          },
                          {
                            "name": "Marketplace"
                          }
                        ]
                      },
                      {
                        "name": "Responsive UI"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "App Love",
                "children": [{
                  "name": "Lyft",
                  "children": [{
                    "name": "Pinterest"
                  }]
                }]
              }
            ]
          }]
        },
        {
          "name": "Freelancer"
        }
      ]
    }
  ]
};

function Node({ node, events }) {
  const width = 40;
  const height = 20;
  return (
    <Group top={node.x} left={node.y}>
      {node.depth === 0 &&
        <circle
          r={12}
          fill="url('#lg')"
        />
      }
      {node.depth !== 0 &&
        <rect
          height={height}
          width={width}
          y={-height / 2}
          x={-width / 2}
          fill={"#272b4d"}
          stroke={node.children ? "#03c0dc" : "#26deb0"}
          strokeWidth={1}
          strokeDasharray={!node.children ? "2,2" : "0"}
          strokeOpacity={!node.children ? .6 : 1}
          rx={!node.children ? 10 : 0}
          onClick={() => {
            alert(`clicked: ${JSON.stringify(node.data.name)}`)
          }}
        />
      }
      <text
        dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={node.depth === 0 ? "#71248e" : node.children ? "white" : "#26deb0"}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function Link({ link }) {
  return (
    <LinkHorizontal
      data={link}
      stroke="#374469"
      strokeWidth="1"
      fill="none"
    />
  );
}

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 10,
    left: 30,
    right: 40,
    bottom: 80,
  }
}) => {
  const data = hierarchy(raw);
  return (
    <svg width={width} height={height}>
      <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
      <rect
        width={width}
        height={height}
        rx={14}
        fill="#272b4d"
      />
      <Tree
        top={margin.top}
        left={margin.left}
        root={data}
        size={[
          height - margin.top - margin.bottom,
          width - margin.left - margin.right
        ]}
        nodeComponent={Node}
        linkComponent={Link}
      />
    </svg>
  );
}
